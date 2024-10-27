using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Address { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasOne(a => a.Addresses).WithOne(u => u.Users).HasForeignKey<Address>(x => x.UserId);

            modelBuilder.Entity<User>().HasMany(o => o.Tasks).WithOne(p => p.User).HasForeignKey(x => x.UserId);
               

            base.OnModelCreating(modelBuilder);
        }


    }
}
