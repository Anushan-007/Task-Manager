namespace TaskManagerAPI.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string Line1 { get; set; }
        public string Street {  get; set; }
        public string City { get; set; }

        public User? Users { get; set; }
        public int? UserId { get; set; }    

    }
}
