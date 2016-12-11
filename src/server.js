/**
 * Created by ad on 11.12.2016.
 */
import express  from 'express';
import cookieParser from 'cookie-parser';
import React    from 'react';
import ReactDom from 'react-dom/server';
import { getHeaders, initialize } from 'redux-oauth';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './redux/configureStore';

const app = express();

app.use(cookieParser());
app.use(express.static('public'));
app.use((req, res) => {
    const store = configureStore();

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) { // Если необходимо сделать redirect
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        }

        if (error) { // Произошла ошибка любого рода
            return res.status(500).send(error.message);
        }

        if (!renderProps) { // мы не определили путь, который бы подошел для URL
            return res.status(404).send('Not found');
        }


        const componentHTML = ReactDom.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        return res.end(renderHTML(componentHTML));
    });
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML) {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="/styles/bootstrap.css">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});