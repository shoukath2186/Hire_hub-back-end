import mongoose, { Model, Schema } from "mongoose";

import { IJob } from "../../entities/IJob";


const JobSchema: Schema<IJob> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    employer_id: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    job_type: {
      type: String,
      required: true,
    },
    skill: {
      type: [String], 
      required: true,
    },
    logo: {
      type: String,
      required: true, 
    },
    applications: {
      type: [String], 
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);


const JobModel: Model<IJob> = mongoose.model<IJob>("Job", JobSchema);

export default JobModel;
