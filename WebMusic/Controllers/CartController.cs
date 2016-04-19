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
                Session["GioHang"] = lstCart;
            }
            return lstCart;
        }

        public ActionResult Add(int id,int type , string strURL)
        {
            if(type==1)
            {
                var Intro = db.TRACKs.SingleOrDefault(x => x.ID == id);
            }else if (type == 2)
            {
                var Intro = db.REMIXes.SingleOrDefault(x => x.ID == id);
            }
            //Get cart from sesson
            List<Cart> lstGioHang = GetCart();
            //check exist book in cart
            Cart prod = lstGioHang.Find(x => (x.id == id)&&(x.type==type));
            if (prod == null)
            {
                prod = new Cart(id,type);
                lstGioHang.Add(prod);
                ViewBag.AddSuccess = "Add Successful";
                return Redirect(strURL);
            }
            else
            {
                ViewBag.AddExist = "You were buy";
                return Redirect(strURL);
            }
        }

        public PartialViewResult userCart()
        {
            
        }
    }
}