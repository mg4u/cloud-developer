import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, deleteDirFilesExcept} from './util/util';
import fs from 'fs'
import { tmpdir } from 'os';
(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get( "/filterImageFromURL", async ( req, res ) => {
    // 1. validate the image_url query is exist
    if (!req.query.image_url) {
      return res.status(400).send({message: 'No image_url to filter it'})
    }
    //1. validate the image_url query is a valid url
    const { image_url } = req.query
    const urlExp= /^http(s)?\:\/\/[0-9a-zA-Z]{1,7}[0-9a-zA-Z\.\/\-\_\+\\*@]{1,1000}\.(jpg|png|jpeg|gif|bmp){1}$/
    if( ! urlExp.test(image_url) ) {
      return res.status(400).send({message: 'image_url is not valid'})
    }
    //2. call filterImageFromURL(image_url) to filter the image
    const imagePath = await filterImageFromURL(image_url)
    //3. send the resulting file in the response
    res.sendFile(imagePath)

    // 4. deletes any files on the server on finish of the response
    if (imagePath) {
      const imagePathParts= imagePath.split('/')
      const imageToDelete = imagePathParts[ imagePathParts.length - 1]
      deleteDirFilesExcept(imageToDelete)
    }
  } );

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filterImageFromURL?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();