const clarifai = require ('clarifai');
const { json } = require('body-parser');
const app = new Clarifai.App({
    apiKey: 'd8124893e8404f2482430be2f31cd685'
   });

   const handleApiCall = (req,res) => {
   app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
   .then(data => { res.json(data);
   }) 
   .catch(err => res.status(400).json('unable to work with API'))
 }

 const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('error getting entries'))
  }

  module.exports = {
      handleImage,handleApiCall
  }