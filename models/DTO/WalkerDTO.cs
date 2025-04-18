namespace DeShawnDogWalking.models.DTO;
public class WalkerDTO
{
    public int Id { set; get; }
    public string Name { set; get; }
    public List<CityDTO> Cities {get; set;}
}