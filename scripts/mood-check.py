"""Browser checks against the static export. Run: python scripts/mood-check.py --url http://127.0.0.1:4175"""
import argparse, json, os, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser()
parser.add_argument('--url',default='http://127.0.0.1:4175/')
parser.add_argument('--browsers',default='chromium,webkit')
args=parser.parse_args()
out=Path('review/mood');out.mkdir(parents=True,exist_ok=True)
results=[]

def check(name, condition, detail=None):
    results.append({'check':name,'pass':bool(condition),'detail':detail})

sizes=[(320,568),(375,667),(390,844),(430,932),(768,1024),(1024,768),(1280,720),(1440,900),(1920,1080),(568,320),(844,390),(932,430)]
with sync_playwright() as pw:
    for engine in args.browsers.split(','):
        browser=getattr(pw,engine).launch()
        for width,height in sizes:
            context=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,has_touch=width<500)
            page=context.new_page();errors=[];failed=[];external=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.on('requestfailed',lambda r:failed.append(r.url))
            page.on('request',lambda r:external.append(r.url) if r.url.startswith('http') and not r.url.startswith(args.url.rstrip('/')) else None)
            label=f'{engine}-{width}x{height}'
            try:
                page.goto(args.url,wait_until='networkidle');page.wait_for_timeout(100)
                check(label+' default night',page.get_attribute('html','data-theme')=='night')
                check(label+' audio opt-in',page.evaluate('!elysiaWorld.getState().audio'))
                for theme in ['night','day']:
                    if theme=='day': page.click('#theme');page.wait_for_timeout(800)
                    layout=page.evaluate('''() => {
                      const nodes=[...document.querySelectorAll('.controls button,.scene-nav button,#credits,#bloom')];
                      const rects=nodes.map(el=>({id:el.id||el.dataset.to,r:el.getBoundingClientRect()}));
                      const off=rects.filter(x=>x.r.x<0||x.r.y<0||x.r.right>innerWidth+1||x.r.bottom>innerHeight+1).map(x=>x.id);
                      const small=rects.filter(x=>x.r.width<43.5||x.r.height<43.5).map(x=>x.id);
                      const overlap=[];for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){
                        const a=rects[i].r,b=rects[j].r;
                        if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)overlap.push([rects[i].id,rects[j].id]);
                      }
                      return {overflow:document.documentElement.scrollWidth>innerWidth,off,small,overlap,broken:[...document.querySelectorAll('img[src]')].filter(i=>!i.complete||!i.naturalWidth).length};
                    }''')
                    check(label+' '+theme+' no horizontal overflow',not layout['overflow'])
                    check(label+' '+theme+' controls on screen',not layout['off'],layout['off'])
                    check(label+' '+theme+' 44px hit targets',not layout['small'],layout['small'])
                    check(label+' '+theme+' controls non-overlapping',not layout['overlap'],layout['overlap'])
                    check(label+' '+theme+' images loaded',layout['broken']==0,layout['broken'])
                    if (width,height) in [(390,844),(1440,900),(844,390),(320,568)]:
                        page.screenshot(path=str(out/f'{label}-{theme}.png'))
                check(label+' no script errors',not errors,errors)
                check(label+' no failed requests',not failed,failed)
                check(label+' no external requests',not external,external)
            except Exception as e:check(label+' execution',False,str(e))
            finally:context.close()
        context=browser.new_context(viewport={'width':1440,'height':900});page=context.new_page()
        try:
            page.goto(args.url,wait_until='networkidle')
            for i in [1,2,0]:
                page.click(f'.scene[data-to="{i}"]');page.wait_for_function(f'elysiaWorld.getState().scene === {i}');page.wait_for_timeout(1100)
                check(engine+f' scene {i}',page.locator('.scene[aria-current="true"]').count()==1)
                if i!=0:page.screenshot(path=str(out/f'{engine}-scene-{i}.png'))
            page.mouse.move(1250,700);page.wait_for_timeout(550)
            check(engine+' parallax follows pointer',abs(page.evaluate('elysiaWorld.getState().x'))>1)
            check(engine+' native cursor',page.evaluate('getComputedStyle(document.querySelector("#world")).cursor')=='auto')
            page.click('#pause');before=page.evaluate('elysiaWorld.getState().frame');page.wait_for_timeout(260)
            check(engine+' pause stops RAF',before==page.evaluate('elysiaWorld.getState().frame') and not page.evaluate('elysiaWorld.getState().raf'))
            page.click('#pause');page.wait_for_timeout(200)
            check(engine+' resume restarts RAF',page.evaluate('elysiaWorld.getState().frame')>before)
            page.click('#immersive');check(engine+' immersive hides navigation',page.locator('.scene-footer').evaluate('(el)=>el.inert') and page.evaluate('elysiaWorld.getState().immersed'))
            page.keyboard.press('Escape');check(engine+' Escape restores page',not page.evaluate('elysiaWorld.getState().immersed'))
            page.click('#credits');check(engine+' dialog opens',page.locator('#about').evaluate('(el)=>el.open'))
            page.keyboard.press('Escape');check(engine+' dialog restores focus',page.evaluate('document.activeElement.id')=='credits')
            page.click('#theme');page.reload(wait_until='networkidle');check(engine+' theme persists',page.get_attribute('html','data-theme')=='day')
            page.emulate_media(reduced_motion='reduce');page.wait_for_timeout(100);before=page.evaluate('elysiaWorld.getState().frame');page.wait_for_timeout(220)
            check(engine+' reduced motion no RAF',before==page.evaluate('elysiaWorld.getState().frame') and page.evaluate('elysiaWorld.getState().reduced'))
            page.click('.scene[data-to="1"]');page.wait_for_function('elysiaWorld.getState().scene===1');check(engine+' reduced motion scene controls work',page.get_attribute('html','data-scene')=='garden')
            page.emulate_media(reduced_motion='no-preference');page.click('#sound');page.wait_for_timeout(200);check(engine+' sound starts only on click',page.evaluate('elysiaWorld.getState().audio'))
            page.click('#sound');check(engine+' sound stops',not page.evaluate('elysiaWorld.getState().audio'))
        except Exception as e:check(engine+' interactions execution',False,str(e))
        finally:context.close()
        context=browser.new_context();page=context.new_page()
        try:
            page.route('**/img/garden.webp',lambda route:route.abort())
            page.goto(args.url,wait_until='networkidle');page.click('.scene[data-to="1"]');page.wait_for_selector('#toast:not([hidden])')
            check(engine+' missing scene retains current image',page.evaluate('elysiaWorld.getState().scene')==0 and page.locator('#art-a').evaluate('(i)=>i.naturalWidth>0'))
        except Exception as e:check(engine+' missing image execution',False,str(e))
        finally:context.close()
        browser.close()
summary={'passed':sum(r['pass'] for r in results),'failed':sum(not r['pass'] for r in results),'checks':results,'limits':['Headless desktop/mobile emulation, not physical phones.','No production deployment or DNS checks.','Reused asset authorship/licenses not fully verified.']}
(out/'QA.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in summary.items() if k!='checks'},ensure_ascii=False))
for r in results:
    if not r['pass']:print('FAIL',r)
sys.exit(1 if summary['failed'] else 0)
