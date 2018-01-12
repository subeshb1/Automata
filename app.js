const express = require('express');

const app = express();


app.use('/static',express.static('./static'));
app.listen(process.env.PORT || 4000);