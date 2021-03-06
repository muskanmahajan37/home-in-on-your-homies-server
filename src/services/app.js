import Koa from 'koa'
import Router from 'koa-router'
import send from 'koa-send'
import path from 'path'
import fs from 'mz/fs'

const app = new Koa();
const router = new Router();

let publicPath = path.join(__dirname, '../../public');
const isFile = /\/.+\.[\w]+$/.test;
const asFile = path => isFile(path) ? path : '/';

const useOptions = opts => publicPath = opts.publicPath;


//
app.use(async (ctx, next) => {
    // TODO: logger stuff
    await next();
}, async (ctx, next) => {
    // TODO: authentication
    await next();
});



// other stuff can get addded externally




// default behavior
router.use(async (ctx, next) => {
    const root = publicPath;
    const file = asFile(ctx.path);
    if(file == '/' || await fs.exists(path.join(root, file))){
        await send(ctx, file, {
            // TODO: import root path?
            root: root,
            immutable: true,
            index: 'index.bundle.html',
        });
    } else {
        await next();
    }
});

app.use(router.routes());

export { app }
export { useOptions }