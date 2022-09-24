// Dependencies
import mongoose from "mongoose";

// Model
const NameChangeHistory = mongoose.model( "NameChangeHistory", {

	new_name: { type: String, required: true },
	old_name: { type: String, required: true },
	email: { type: String, required: true },
	cpf: { type: Number, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default NameChangeHistory;