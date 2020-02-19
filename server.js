const koa = require('koa');
const app = koa();

if (process.env.NODE_ENV === 'production') {
    app.use(koa.static('./build'));
}

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, './build', 'index.html'));
});