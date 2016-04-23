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

        [HttpPost]
        public string Add(PostTrackRemix product)
        {
            
            List<Cart> lstGioHang = GetCart();

            Cart temp = lstGioHang.Find(x => (x.id == product.id) && (x.type == product.type));
            if (temp == null)
            {
                temp = new Cart();
                if (product.type == 1)
                {
                    TRACK tempTrack = db.TRACKs.Where(x => x.ID == product.id).FirstOrDefault();
                    if (tempTrack != null)
                    {
                        temp.id = tempTrack.ID;
                        temp.type = 1;
                        temp.name = tempTrack.NAME;
                        if (tempTrack.COST != null) temp.cost = (double)tempTrack.COST;
                    }
                    temp.artist = db.TRACK_ARTIST.Where(p => p.ID_TRACK == product.id).Select(p => p.NAME_ARTIST).ToList();
                    temp.label = db.TRACK_ARTIST.Where(p => p.ID_TRACK == product.id).Select(p => p.NAME_LABEL).ToList();
                }
                else if (product.type == 2)
                {
                    REMIX tempTrack = db.REMIXes.Where(x => x.ID == product.id).FirstOrDefault();
                    if (tempTrack != null)
                    {
                        temp.id = tempTrack.ID;
                        temp.type = 2;
                        temp.name = tempTrack.NAME;
                        if (tempTrack.COST != null) temp.cost = (double)tempTrack.COST;
                    }
                    temp.artist = db.REMIX_ARTIST.Where(p => p.ID_REMIX == product.id).Select(p => p.NAME_ARTIST).ToList();
                    temp.label = db.REMIX_ARTIST.Where(p => p.ID_REMIX == product.id).Select(p => p.NAME_LABEL).ToList();
                }
                lstGioHang.Add(temp);
                Session["Cart"] = lstGioHang;
                Session["TotalMoney"] = Convert.ToDouble(Session["TotalMoney"].ToString()) + temp.cost;

                return Session["TotalMoney"].ToString();
            }
            else
            {
                return "";
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
            lstCart = GetCart();
            USER user = Session["User"] as USER;
            double totalDebt = Convert.ToDouble(Session["TotalMoney"].ToString());

            totalDebt = Math.Round(totalDebt, 2);
            ViewBag.TotalDebt = totalDebt;
            ViewBag.UserName = user.FIRSTNAME + " " + user.LASTNAME;
            return PartialView();
        }

        public ActionResult CartDetail()
        {
            if (Session["Cart"] == null)
            {
                return Json(null);
            }
            var lstGioHang = GetCart();
            //double totalDebt = Convert.ToDouble(Session["TotalMoney"].ToString());
            //totalDebt = Math.Round(totalDebt, 2);
            //ViewBag.TotalDebt = totalDebt;
            return Json(lstGioHang , JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public PartialViewResult CartBuy()
        {
            return PartialView();
        }

        [HttpPost]
        public PartialViewResult CartBuy(Pay pay)
        {

            USER tempUser = db.USERs.Where(p => p.EMAIL == pay.email && p.PASSWORD == pay.password).FirstOrDefault();
            if (tempUser != null)
            {
                CARD tempCard = db.CARDs.Where(p => p.NUMBER == pay.cardNumber && p.PASSWORD == pay.passwordCard).FirstOrDefault();
                if (tempCard != null)
                {
                    Session["Cart"] = null;
                    Session["TotalMoney"] = 0;
                }
            }

            return PartialView("CartDetail");
        }
    }
}