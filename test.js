const express = require('express');
const router = express.Router();
const connection = require('../../db/mySql')

router.get('/', async (req, res) => {
  console.log("weszlo")
  let location = req.query.location
  let type = req.query.type
  let user_id = req.query.user_id
  console.log(user_id)
  try {
    let sqlQuery;
    if ( location ){
      sqlQuery=`SELECT * FROM properties where location = '${location}' and type=${type}`
    } else if (user_id ) {
      console.log("moj sql")
      sqlQuery=`SELECT * FROM properties where user_id='${user_id}'`
    } else if( location==undefined ){
      sqlQuery='SELECT * FROM properties' 
    }
    const rows = await connection.query(sqlQuery);
    delete rows.meta;
    console.log(rows)
    res.status(200).json(rows).end();
    
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message)
  }

});
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM properties where id = ?`;
    const rows = await connection.query(sqlQuery, [req.params.id]);
    delete rows.meta;
    res.status(200).json(rows).end();
    
  } catch (error) {
    res.status(400).send(error.message)
  }

});
router.post('/', async (req, res) => {
  console.log("server triggeered")
  const {title, description, price, type, location, img, kind, user_id} = req.body
  console.log(req.body)

  try {
    const sqlQuery = ` 
    INSERT INTO properties (title, description, price, type, location, img, kind, user_id)
    VALUES
    ('${title}', '${description}', ${parseInt(price)}, '${type}', '${location}', '${img}', '${kind}', 5 )
    `
    const rows = await connection.query(sqlQuery);
    res.status(200).json({ response: 'Added'}).end();
    
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message)
  }


});
router.put('/:id', (req, res) => {
  console.log("put entered")
  res.status(200).json('entered put').end();

});

router.delete('/:id', async(req, res) => {
  console.log("weszlo")
  // res.status(200).json('delete weszlo').end();

  try {
    const sqlQuery = `DELETE FROM properties where id = ${(req.params.id)}`;
    const rows = await connection.query(sqlQuery);
    res.status(200).json({properties: 'Deleted'}).end();
    
  } catch (error) {
    res.status(400).send(error.message)
  }
});

module.exports = router
