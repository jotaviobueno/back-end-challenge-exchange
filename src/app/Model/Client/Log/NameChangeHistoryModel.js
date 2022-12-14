// Dependencies
import mongoose from "mongoose";

// Model
const NameChangeHistoryModel = mongoose.model( "NameChangeHistory", {

	new_name: { type: String, required: true },
	old_name: { type: String, required: true },
	email: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default NameChangeHistoryModel;