using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMusic.Models;

namespace WebMusic.Controllers
{
    public class CartController : Controller
    {

        MusicEntities db = new MusicEntities();

        // GET: Cart

        public List<Cart> GetCart()
        {
            List<Cart> lstCart = Session["Cart"] as List<Cart>;
            if (lstCart == null)
            {
                //If cart is not exist, we will create new cart(giohang)
                lstCart = new List<Cart>();
                Session["Cart"] = lstCart;
                Session["TotalMoney"] = 0;
            }
            return lstCart;
        }

        public ActionResult Add(int id, int type, string strURL)
        {
            var cost = 0.1;
            if (type == 1)
            {
                cost = (double)db.TRACKs.Where(x => x.ID == id).Select(p=>p.COST).FirstOrDefault();
            }
            else if (type == 2)
            {
                cost = (double)db.REMIXes.Where(x => x.ID == id).Select(p => p.COST).FirstOrDefault();
            }
            //Get cart from sesson
            List<Cart> lstGioHang = GetCart();
            //check exist book in cart
            Cart prod = lstGioHang.Find(x => (x.id == id) && (x.type == type));
            if (prod == null)
            {
                prod = new Cart(id, type);
                lstGioHang.Add(prod);
                Session["Cart"] = lstGioHang;
                Session["TotalMoney"] = Convert.ToDouble(Session["TotalMoney"].ToString()) + cost; 
                return Redirect(strURL);
            }
            else
            {
                return Redirect(strURL);
            }
        }

        public PartialViewResult userCart()
        {

            if (Session["User"] == null)
            {
                ViewBag.UserName = null;
                return PartialView();
            }

            List<Cart> lstCart = new List<Cart>();
            lstCart =  Session["Cart"] as List<Cart>;
            USER user = Session["User"] as USER;
            double totalDebt = Convert.ToDouble(Session["TotalMoney"].ToString());
            
            totalDebt = Math.Round(totalDebt, 2);
            ViewBag.TotalDebt = totalDebt;
            ViewBag.UserName = user.FIRSTNAME + " " + user.LASTNAME;
            return PartialView();
        }

        public ActionResult Cart()
        {
            if (Session["Cart"] == null)
            {
                return RedirectToAction("Index", "Home");
            }
            List<Cart> lstGioHang = GetCart();
            double totalDebt = Convert.ToDouble(Session["TotalMoney"].ToString());
            totalDebt = Math.Round(totalDebt, 2);
            ViewBag.TotalDebt = totalDebt;
            return View(lstGioHang);
        }

    }
}