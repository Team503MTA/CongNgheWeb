//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebMusic.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class HISTORY_USER
    {
        public int ID_USER { get; set; }
        public System.DateTime TIME { get; set; }
        public int ID_TRACK { get; set; }
        public Nullable<double> COST { get; set; }
        public byte TYPE { get; set; }
        public Nullable<byte> RANK { get; set; }
        public Nullable<short> DISTANCE_NEAR { get; set; }
    
        public virtual TRACK TRACK { get; set; }
        public virtual USER USER { get; set; }
    }
}
