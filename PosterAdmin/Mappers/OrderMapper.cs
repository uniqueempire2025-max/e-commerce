using AutoMapper;
using PosterAdmin.DTOs;
using PosterAdmin.Models;

namespace PosterAdmin.Mappers
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile()
        {
            CreateMap<Order, OrderListDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.ItemCount, opt => opt.MapFrom(src => src.OrderItems.Count));
            
            CreateMap<Order, OrderDetailDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.OrderItems));
            
            CreateMap<OrderItem, OrderItemDto>();
            
            CreateMap<UpdateOrderStatusDto, Order>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.OrderId));
        }
    }
}
