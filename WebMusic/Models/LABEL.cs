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
    
    public partial class LABEL
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LABEL()
        {
            this.ARTISTs = new HashSet<ARTIST>();
            this.GENRE_LABEL = new HashSet<GENRE_LABEL>();
            this.SOUNDS = new HashSet<SOUND>();
        }
    
        public short ID { get; set; }
        public string NAME { get; set; }
        public Nullable<System.DateTime> FOUNDED { get; set; }
        public string FOUNDER { get; set; }
        public string LOCATION { get; set; }
        public string DESCRIP { get; set; }
        public string LINK { get; set; }
        public string LINK_IMG { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ARTIST> ARTISTs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GENRE_LABEL> GENRE_LABEL { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SOUND> SOUNDS { get; set; }
    }
}
