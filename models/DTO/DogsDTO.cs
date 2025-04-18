namespace DeShawnDogWalking.models.DTO;
public class DogDTO
{
    public int Id { set; get; }
    public string Name { set; get; }
    public int? WalkerId { set; get; }
    public int CityId { set; get; }
    public CityDTO City { set; get; }
    public WalkerDTO? Walker { set; get; }
}