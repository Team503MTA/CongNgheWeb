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
    
    public partial class TRACK_ARTIST
    {
        public int ID_TRACK { get; set; }
        public int ID_ARTIST { get; set; }
        public string NAME_ARTIST { get; set; }
        public string NAME_LABEL { get; set; }
        public Nullable<double> COST { get; set; }
        public string NAME_TRACK { get; set; }
    
        public virtual ARTIST ARTIST { get; set; }
        public virtual TRACK TRACK { get; set; }
    }
}
