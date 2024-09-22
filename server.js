import app from './app.js'
import main from './config/db.js';

const PORT = process.env.PORT || 6000

app.listen(PORT, (err) => {
    if (err) return err;
    main()
    console.log("Server Started at ", PORT)
})