﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    public class UserController : Controller
    {

        MusicEntities db = new MusicEntities();

        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public PartialViewResult Register()
        {
            return PartialView();
        }

        [HttpPost]
        public PartialViewResult Register(USER us)
        {

            us.LEVEL_ = 1;

            db.USERs.Add(us);
            db.SaveChanges();

            @ViewBag.register = "success";

            return PartialView();
        }


        [HttpGet]
        public PartialViewResult Login()
        {
            return PartialView();
        }

        [HttpPost]
        public PartialViewResult Login(FormCollection f)
        {
            string sTaikhoan = f["userEmail"].ToString();
            string sMatkhau = f.Get("userPassword").ToString();
            USER user = db.USERs.SingleOrDefault(x => x.EMAIL == sTaikhoan && x.PASSWORD == sMatkhau);
            if (user != null)
            {
                ViewBag.login = "success";
                Session["User"] = user;
            }
            else
            {
                ViewBag.login = "unsuccess";
            }
            return PartialView();
        }
    }
}