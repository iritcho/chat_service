import tornado.ioloop
import tornado.web
import tornado.websocket

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("talk.html")

class TalkHandler(tornado.websocket.WebSocketHandler):
    clients = []

    def open(self):
        if self not in TalkHandler.clients:
            TalkHandler.clients.append(self)

    def on_message(self, message):
         for cl in TalkHandler.clients:
             cl.write_message(message)

    def on_close(self):
        if self in TalkHandler.clients:
            TalkHandler.clients.remove(self)

if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/talk", MainHandler),
        (r"/ws", TalkHandler),
        ],
        template_path="templates",
        static_path="static"
    )
    application.listen(8888)
    io_loop = tornado.ioloop.IOLoop.current()
    io_loop.start()
