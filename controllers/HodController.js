const HodModel = require("../models/hod");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../config/cloudinary")
const path = require('path')
const fs = require('fs')


class HodController {
  static display = async (req, res) => {
    try {
      const hod = await HodModel.find()
      res.render("hod/display", {
        role: req.user.role,
        name: req.user.name,
        hod,
        error: req.flash("error"),
        success: req.flash("success"),
      }); //folder(student) display.ejs
    } catch (error) {
      console.log(error);
    }
  };
  static insertHod = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.files.image)
      const { name, address, gender, department, email, phone, } =
        req.body;
      const password = "1234"
      const hashedPassword = await bcrypt.hash(password, 10);
      let imageData = {
        public_id: "",
        url: "",
      };
      if (req.file) {
        imageData.public_id = req.file.filename;
        imageData.url = req.url.path;
      }

      const newHod = new HodModel({
        name,
        address,
        gender,
        department,
        email,
        phone,
        password: hashedPassword,
        image: imageData,
        registeredBy: req.user.role,
      });
      await newHod.save();

      req.flash("success", "HOD registered successfully!")
      res.redirect("/hod/display")

    } catch (error) {
      console.log(error);
      req.flash("error", "Failed to register!")
      res.redirect("/hod/display")
    }
  };
  static hodDelete = async (req, res) => {
    try {
      const id = req.params.id
      // console.log(id)
      await HodModel.findByIdAndDelete(id)
      req.flash("success", "HOD Delete successfully")
      return res.redirect('/hod/display')

    }
    catch (error) {
      console.log(error)
    }
  }
  static hodView = async (req, res) => {
    try {
      const id = req.params.id
      // console.log(id)
      const view = await HodModel.findById(id)
      // console.log(view)
      res.render("hod/View", { view })
    }
    catch (error) {
      console.login(error)
    }
  };
  //Edit
  static hodEdit = async (req, res) => {
    try {
      const id = req.params.id
      // console.log(id)
      const edit = await HodModel.findById(id)
      // console.log(view)
      res.render("hod/Edit", { edit })
    }
    catch (error) {
      console.login(error)
    }
  };

  //Update
  static hodUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        email,
        password,
        phone,
        gender,
        department,
        role,
      } = req.body;
      if (req.files) {
        const hod = await HodModel.findById(id);
        const imageID = hod.image.public_id;
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
          name,
          email,
          password,
          phone,
          gender,
          department,
          role,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name,
          email,
          password,
          phone,
          gender,
          department,
          role,
        };
      }
      await HodModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/hod/display");
    } catch (error) {
      console.log(error);
    }
  };

}
module.exports = HodController;