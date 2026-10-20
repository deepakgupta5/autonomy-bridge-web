import http.server,sys
from pathlib import Path
class Handler(http.server.SimpleHTTPRequestHandler):
 def do_GET(self):
  p=self.path.split('?')[0]
  for line in (Path(self.directory)/'_redirects').read_text().splitlines():
   fields=line.split()
   if len(fields)>=3 and fields[0]==p and fields[2]=='301!':
    self.send_response(301);self.send_header('Location',fields[1]);self.end_headers();return
  if p!='/' and Path(self.directory+p+'.html').is_file(): self.path=p+'.html'
  super().do_GET()
 def log_message(self,*args):pass
root=sys.argv[1];port=int(sys.argv[2])
http.server.ThreadingHTTPServer(('127.0.0.1',port),lambda *a,**kw:Handler(*a,directory=root,**kw)).serve_forever()
