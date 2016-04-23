using System;
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

        //[HttpPost]
        //public PartialViewResult Register(USER us)
        //{

        //    us.LEVEL_ = 1;

        //    db.USERs.Add(us);
        //    db.SaveChanges();

        //    @ViewBag.register = "success";

        //    return PartialView();
        //}

        [HttpPost]
        public JsonResult Register(USER us)
        {

            db.USERs.Add(us);
            db.SaveChanges();

            //Đoạn mã thêm mới USER vào cơ sở dữ liệu
            return Json("Thêm mới thành công");
        }


        [HttpGet]
        public PartialViewResult Login()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult Login(UserLogin userTemp)
        {
            USER user = db.USERs.Where(x => x.EMAIL == userTemp.email && x.PASSWORD == userTemp.password).FirstOrDefault();
            if (user != null)
            {
                Session["User"] = user;
                return Json("vu hoang ha");  //dang nhap thanh cong
            }
            return Json("");  //dang nhap khong thanh cong
        }
    }
}