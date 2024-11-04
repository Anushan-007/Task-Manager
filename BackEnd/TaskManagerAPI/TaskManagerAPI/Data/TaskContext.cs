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
        public DbSet<UserRegister> UsersRegister { get; set; }
      


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasOne(a => a.Addresses).WithOne(u => u.Users).HasForeignKey<Address>(x => x.UserId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>().HasMany(o => o.Tasks).WithOne(p => p.User).HasForeignKey(x => x.UserId);

            modelBuilder.Entity<TaskItem>().HasMany(t => t.Checks).WithOne(c => c.TaskItem).HasForeignKey(x => x.TaskId);
               

            base.OnModelCreating(modelBuilder);
        }


    }
}
