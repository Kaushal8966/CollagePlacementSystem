const CompanyModel = require('../models/company')
const bcrypt = require('bcrypt');
const {cloudinary}= require("../config/cloudinary")
const path = require('path')
const fs = require('fs')

class CompanyController {
    static display = async (req, res) => {
        try {
              const company =await CompanyModel.find()
            console.log(company)
            res.render('company/display', { success: req.flash('success'), error: req.flash('error'),std:company})//folder(student)
        } catch (error) {
            console.log(error)

        }

    }

    static insertCompany = async (req, res) => {
        try {
                      
              //  console.log(req.body)
              //   console.log(req.files.image)
                 const { name, address, website,  email, phone, password } =
                        req.body;
                      const existingCompany = await CompanyModel.findOne({ email });
                      if (existingCompany) {
                        req.flash("error", "Email already registered");
                        return res.redirect("/company/display");
                      }
                      //image uplaod
                      const file = req.files.image;
                      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                        folder: "company image",
                      });
                      // console.log(imageUpload);
                      const hashPassword = await bcrypt.hash(password, 10);
                     
                      const result = await CompanyModel.create({
                        
                         name,
                        address,
                        website,
                        email,
                        phone,
                        password:hashPassword,
                        image: {
                          public_id: imageUpload.public_id,
                          url: imageUpload.secure_url
                        }
                
                      })
                      req.flash("success","company registered successfully!")
                      return res.redirect("/company/display")
                
                    } catch (error) {
                      console.log(error);
                    }
                  }
    static companyDelete = async (req, res) => {
      try {
        const id = req.params.id
        // console.log(id)
        await CompanyModel.findByIdAndDelete(id)
        req.flash("success", "company Delete successfully")
        return res.redirect('/company/display')
  
      }
      catch (error) {
        console.log(error)
      }
    }


     static companyView = async (req, res) => {
    try {
      const id = req.params.id
        // console.log(id)
    const view =  await CompanyModel.findById(id)
      //  console.log(View)
      res.render("company/View" ,{view})

    } catch (error) {
      console.log(error);
    }
  };

   //Edit
    static companyEdit = async (req, res) => {
      try {
        const id = req.params.id
        // console.log(id)
        const edit = await CompanyModel.findById(id)
        // console.log(view)
        res.render("company/Edit", { edit })
      }
      catch (error) {
        console.login(error)
      }
    };
  
    //Update
    static companyUpdate = async (req, res) => {
      try {
        const id = req.params.id;
        const {
          name,
          email,
          password,
          phone,
          address,
          website,
          role,
          
        } = req.body;
        if (req.files) {
          const company = await CompanyModel.findById(id);
          const imageID = company.image.public_id;
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
          address,
          website,
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
          address,
          website,
          role,
          
          };
        }
        await CompanyModel.findByIdAndUpdate(id, data);
        req.flash("success", "Update Profile successfully");
        res.redirect("/company/display");
      } catch (error) {
        console.log(error);
      }
    };


  };
                
                



           

 
  

module.exports = CompanyController