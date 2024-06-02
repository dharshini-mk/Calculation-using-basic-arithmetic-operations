const http = require('http');
const url = require('url');
const cal = require("./m2");

function getexample(request, response) {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;
    const qs = parsedUrl.query;
    const num1 = parseInt(qs['num1']);
    const num2 = parseInt(qs['num2']);
    var result;
    var op;
    switch (path) {
        case '/add':
            op = 'addition';
            result = cal.add(num1, num2);
            break;
        case '/sub':
            op = 'subtraction';
            result = cal.sub(num1, num2);
            break;
        case '/product':
            op = 'multiplication';
            result = cal.product(num1, num2);
            break;
        case '/divide':
            op = 'division';
            result = cal.divide(num1, num2);
            break;
        case '/modulo':
            op = 'modulo';
            result = cal.modulo(num1, num2);
            break;
        case '/power':
            op = 'power';
            result = cal.power(num1, num2);
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('Page not found');
            response.end();
            return;
    }

    console.log('URL ' + request.url + ' received. using get method');
    response.writeHead(200, { 'Content-Type': 'text/html' });

    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculator Result</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-image:url('https://i.pinimg.com/564x/1f/40/24/1f40248e39b28acd8b06a0dbe67a6784.jpg');
                    background-repeat: no-repeat;
                    background-size: cover;
                    margin: 0;
                    padding: 0;
                    align-items:center;
                }
                .result-container {
                    
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    margin: 20px auto;
                    max-width: 600px;
                }
                h2 {
                    color: #333;
                    font-size: 28px;
                    margin-bottom: 20px;
                }           
            </style>
        </head>
        <body>
            <div class="result-container">
            <center>
                <h2>The result of ${op} is ${result}</h2>
                <h4 style="font-family:arial;">Thank You!</h4>
            </center>
            </div>
        </body>
        </html>
    `;   
    response.write(htmlResponse);
    response.end();
}

http.createServer(getexample).listen(4000);
console.log('Server Started');