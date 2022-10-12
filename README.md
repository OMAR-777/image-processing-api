
# Image Processing Api

The first project in Udacity Full Stack JavaScript Development program.  
an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters 
 for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page l
 oad size. Rather than needing to resize and upload multiple copies 
 of the same image to be used throughout your site, the API will handle resizing and serving stored images for you. 



## Run Locally

Clone the project

```bash
  git clone https://github.com/OMAR-777/image-processing-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```



## Build
To build the app 
(./src to ./dist directory), run the following command

```bash
npm run build
```
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Usage/Examples

### Get a full image

#### Request  
`GET /?filename=fjord`

    http://localhost:3000/?filename=fjord

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Accept-Ranges: bytes
    Cache-Control: public, max-age=0
    Last-Modified: Thu, 21 Oct 2021 13:31:06 GMT
    ETag: W/"24f472-17ca30c5190"
    Content-Type: image/jpeg
    Content-Length: 2421874
    Date: Wed, 12 Oct 2022 06:25:58 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

![fjord](https://user-images.githubusercontent.com/63660382/195268205-5d4dfa04-722c-4586-a281-f5fa0447895a.jpg)


### Get an image with height and width set

#### Request  
`GET /?filename=fjord&width=500&height=500`

    http://localhost:3000/?filename=fjord&width=500&height=500

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Accept-Ranges: bytes
    Cache-Control: public, max-age=0
    Last-Modified: Wed, 12 Oct 2022 06:21:05 GMT
    ETag: W/"a25c-183cada90e5"
    Content-Type: image/jpeg
    Content-Length: 41564
    Date: Wed, 12 Oct 2022 06:26:46 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
![fjord_500_500](https://user-images.githubusercontent.com/63660382/195268520-94ccec87-a943-4e9a-8f60-d5cc322d466d.jpg)


### Get a processed image with height and width set
Subsequent requests on the same endpoint as the previous one with the width and height set  
will load the cached version of the image, it will not reprocess the full image again
#### Request  
`GET /?filename=fjord&width=500&height=500`

    http://localhost:3000/?filename=fjord&width=500&height=500

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Accept-Ranges: bytes
    Cache-Control: public, max-age=0
    Last-Modified: Wed, 12 Oct 2022 06:21:05 GMT
    ETag: W/"a25c-183cada90e5"
    Content-Type: image/jpeg
    Content-Length: 41564
    Date: Wed, 12 Oct 2022 06:44:16 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
![fjord_500_500](https://user-images.githubusercontent.com/63660382/195268520-94ccec87-a943-4e9a-8f60-d5cc322d466d.jpg)









