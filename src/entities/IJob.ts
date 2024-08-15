
import { Document } from "mongoose";

export interface IJob extends Document {
    name: string;
    employer_id: string;
    contact: string;
    location: string;
    salary: string;
    title: string; // Corrected the typo from 'titile' to 'title'
    job_type: string;
    skill: string[];
    logo: string;
    applications: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  