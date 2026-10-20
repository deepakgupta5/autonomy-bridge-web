import http.server,sys
from pathlib import Path
class Handler(http.server.SimpleHTTPRequestHandler):
 def do_GET(self):
  p=self.path.split('?')[0]
  if p!='/' and not Path(self.directory+p).exists() and Path(self.directory+p+'.html').exists(): self.path=p+'.html'
  super().do_GET()
 def log_message(self,*args):pass
root=sys.argv[1];port=int(sys.argv[2])
http.server.ThreadingHTTPServer(('127.0.0.1',port),lambda *a,**kw:Handler(*a,directory=root,**kw)).serve_forever()
