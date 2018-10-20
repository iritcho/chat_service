import tornado.ioloop
import tornado.web

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/talk", MainHandler),
        ]

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        string = self.get_argument('string', '')
        self.render('talk.html', string='')

    def post(self):
        string = self.get_argument('string', '')
        self.render('talk.html', string=string)

application = tornado.web.Application([
    (r"/talk", MainHandler),
    ],
    template_path='templates',
    static_path='css',
)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
