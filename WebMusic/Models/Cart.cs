using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebMusic.Models;

namespace WebMusic.Models
{
    public class Cart
    {

        MusicEntities db = new MusicEntities();
        public int id { get; set; }

        public int type { get; set; }

        public Cart(int _id ,int _type)
        {
            id = _id;
            type = _type;
        }

    }
}
