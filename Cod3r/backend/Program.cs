var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_Angular";

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(op =>
{
    op.AddPolicy(name: MyAllowSpecificOrigins,
                builder => {
                    builder.WithOrigins("http://localhost:4200",
                                        "https://localhost:4200")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

//app.MapGet("/", () => "Hello World!");

app.MapGet("/v1/todos", (AppDbContext context) => {
    var todos = context.Todos.ToList();
    return Results.Ok(todos);
}).AllowAnonymous();

app.MapGet("/v1/{id}", async(int id, AppDbContext context) => {
    var dbTodo = await context.Todos.FindAsync(id);
    if(dbTodo == null)
        return Results.NoContent();

    return Results.Ok(dbTodo);
    });

app.MapPost("/v1/create", async(Todo todo, AppDbContext context)=>{
    context.Todos.Add(todo);
    await context.SaveChangesAsync();
    return Results.Ok(todo);
        });

app.MapDelete("/v1/delete/{id}", async (int id, AppDbContext context) =>
{
    var dbTodo = await context.Todos.FindAsync(id);
    if (dbTodo == null)
    {
        return Results.NoContent();
    }
    context.Todos.Remove(dbTodo);
    await context.SaveChangesAsync();
    return Results.Ok();
});
app.Run();
