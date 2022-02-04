namespace backend.Data;

public class AppDbContext : DbContext
{
    public DbSet<Todo> Todos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder op)
    {
        op.UseSqlite("DataSource=Banco.db;Cache=Shared");
    }
}
