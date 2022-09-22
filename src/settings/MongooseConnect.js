// Dependencies
import mongoose from "mongoose";
import chalk from "chalk";

export async function Connect () {

	return await mongoose.connect( process.env.DB_LINK ).then( () => {
		console.log( chalk.bgBlack("connected with Mongoose") );

		return true;
    
	}).catch( (e) => {
		throw (e);
	});
}