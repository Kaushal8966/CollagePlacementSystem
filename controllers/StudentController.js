const StudentModel = require('../models/student')
const bcrypt = require('bcrypt');
const {cloudinary}= require("../config/cloudinary")
const path = require('path')
const fs = require('fs')




class StudentController {
  static display = async (req, res) => {
    try {
      const student = await StudentModel.find()
      console.log(student)
      res.render("students/display", {

        error: req.flash("error"),
        success: req.flash("success"),
        std: student

      }); //folder(student) display.ejs
    } catch (error) {
      console.log(error);
    }
  };
  // static insertStudent = async (req, res) => {
  //   try {
  //     // console.log(req.files)
  //     const {
  //       rollNumber,
  //       name,
  //       address,
  //       gender,
  //       email,
  //       dob,
  //       phone,
  //       branch,
  //       semester,
  //       password,
  //       image,
  //     } = req.body;
  //     const existingStudent = await StudentModel.findOne({ email });
  //     const existingRoll = await StudentModel.findOne({ rollNumber });
  //     if (existingStudent) {
  //       req.flash('error', "Email already registered")
  //       res.redirect('/student/display')

  //     }
  //     if (existingRoll) {
  //       req.flash('error', "RollNumber already registered")
  //       res.redirect('/student/display')

  //     }
  //     //file upload
  //     const file = req.files.image
  //     const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
  //       folder: "student_images",
  //     });
  //     console.log(imageUpload)

  //     const hashPassword = await bcrypt.hash(password, 10);

  //     const result = await StudentModel.create({
  //       rollNumber,
  //       name,
  //       address,
  //       gender,
  //       email,
  //       dob,
  //       phone,
  //       branch,
  //       semester,
  //       password: hashPassword,
  //       image: {
  //         public_id: imageUpload.public_id,
  //         url: imageUpload.secure_url
  //       }

  //     })
  //     req.flash('success', "Student registered successfully!")
  //     req.redirect('/student/display')

  //   } catch (error) {
  //     console.log(error)

  //   }
  // }

  static insertStudent = async (req, res) => {
    try {
      const {
        rollNumber,
        name,
        address,
        gender,
        email,
        dob,
        phone,
        branch,
        semester,
      } = req.body;

      const password = "1234";
      const hashedPassword = await bcrypt.hash(password, 10);

      let imageData = {
        public_id: "",
        url: "",
      };

      if (req.file) {
        imageData.public_id = req.file.filename;
        imageData.url = req.file.path;
      }

      const newStudent = new StudentModel({
        rollNumber,
        name,
        address,
        gender,
        email,
        dob,
        phone,
        branch,
        semester,
        password: hashedPassword,
        image: imageData,
        registeredBy: req.user.role,
      });

      await newStudent.save();

    

      req.flash("success", "Student registered successfully and email sent.");
      res.redirect("/student/display");

    } catch (err) {
      console.log(err);
      req.flash("error", "Failed to register student.");
      res.redirect("/student/display");
    }
  };

  //delete the data
  static studentDelete = async (req, res) => {
    try {
      const id = req.params.id
      // console.log(id)
      await StudentModel.findByIdAndDelete(id)
      req.flash("success", "Student Delete successfully")
      return res.redirect('/student/display')

    }
    catch (error) {
      console.log(error)
    }
  }


  //View
  static studentView = async (req, res) => {
    try {
      const id = req.params.id
      // console.log(id)
      const view = await StudentModel.findById(id)
      // console.log(view)
      res.render("students/View", { view })
    }
    catch (error) {
      console.login(error)
    }
  };
  //Edit
   static studentEdit = async (req, res) => {
    try {
      const id = req.params.id
      // console.log(id)
      const edit = await StudentModel.findById(id)
      // console.log(view)
      res.render("students/Edit", { edit })
    }
    catch (error) {
      console.login(error)
    }
  };
  //Update
  static studentUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        rollNumber,
        name,
        address,
        gender,
        email,
        dob,
        phone,
        branch,
        semester,
        password,
      } = req.body;
      if (req.files) {
        const student = await StudentModel.findById(id);
        const imageID = student.image.public_id;
        // console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
       
        var data = {
          rollNumber,
          name,
          address,
          gender,
          email,
          dob,
          phone,
          branch,
          semester,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          rollNumber,
          name,
          address,
          gender,
          email,
          dob,
          phone,
          branch,
          semester,
        };
      }
      await StudentModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/student/display");
    } catch (error) {
      console.log(error);
    }
  };

}
module.exports = StudentController
