using DeShawnDogWalking.models.DTO;
using DeShawnDogWalking.models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(); // 👈 MUST come before UseHttpsRedirection
app.UseHttpsRedirection();

List<City> Cities = new List<City>
{
    new City { Id = 1, Name = "New York" },
    new City { Id = 2, Name = "Los Angeles" },
    new City { Id = 3, Name = "Chicago" },
    new City { Id = 4, Name = "Houston" },
    new City { Id = 5, Name = "Phoenix" }
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Max", CityId = 2, WalkerId = 3},
    new Dog { Id = 2, Name = "Bella", CityId = 2 },
    new Dog { Id = 3, Name = "Charlie", CityId = 3 },
    new Dog { Id = 4, Name = "Lucy", CityId = 4 },
    new Dog { Id = 5, Name = "Rocky", CityId = 5 },
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Walker One" },
    new Walker { Id = 2, Name = "Walker Two" },
    new Walker { Id = 3, Name = "Walker Three" },
    new Walker { Id = 4, Name = "Walker Four" },
    new Walker { Id = 5, Name = "Walker Five" },
};

List<CityWalker> cityWalkers = new List<CityWalker> {
    new CityWalker { Id = 1, WalkerId = 1, CityId = 1},
    new CityWalker { Id = 2, WalkerId = 2, CityId = 2},
    new CityWalker { Id = 3, WalkerId = 3, CityId = 3},
    new CityWalker { Id = 4, WalkerId = 4, CityId = 4},
    new CityWalker { Id = 5, WalkerId = 5, CityId = 5},
};


app.MapGet("/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
});
app.MapGet("/dogDetails/{id}", (int id) =>
{   
    Dog dog = dogs.FirstOrDefault(dog => dog.Id == id);
    if (dog == null) {
        return Results.NotFound();
    }
    Walker walker = walkers.FirstOrDefault(walker => walker.Id == dog.WalkerId);
    City city = Cities.FirstOrDefault(city => city.Id == dog.CityId);

    DogDTO newDog = new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        CityId = dog.CityId,
        Walker = walker == null ? null : new WalkerDTO{
        Id = walker.Id,
        Name = walker.Name,
        },
        City = new CityDTO {
            Id = city.Id,
            Name = city.Name
        }
    };
    return Results.Ok(newDog);
});

app.MapGet("/walkers", () =>
{
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name,
    });
});

app.MapGet("/cities", () =>
{
    return Cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name,
    });
});

app.MapGet("/walkers/cityId={cityId}", (int cityId) =>
{
    List<CityWalker> cities = cityWalkers.Where(cw => cw.CityId == cityId).ToList();

    List<Walker> filteredWalkers = cities.Select(c => walkers.FirstOrDefault(w => w.Id == c.WalkerId)).ToList();

    return filteredWalkers.Select(fw => new WalkerDTO
    {
        Id = fw.Id,
        Name = fw.Name
    });

});

app.MapPost("/dogs", (Dog dog) => {
    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);

    if (dog.CityId == 0 || dog.Name == null) {
        return Results.BadRequest();
    }

    return Results.Created($"/dogs/{dog.Id}", new DogDTO {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
    });
});
  
app.Run();


