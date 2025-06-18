USE [master]
GO
/****** Object:  Database [ecommerce]    Script Date: 6/17/2025 7:17:51 PM ******/
CREATE DATABASE [ecommerce]

 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ecommerce] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ecommerce].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ecommerce] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ecommerce] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ecommerce] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ecommerce] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ecommerce] SET ARITHABORT OFF 
GO
ALTER DATABASE [ecommerce] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ecommerce] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ecommerce] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ecommerce] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ecommerce] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ecommerce] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ecommerce] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ecommerce] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ecommerce] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ecommerce] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ecommerce] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ecommerce] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ecommerce] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ecommerce] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ecommerce] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ecommerce] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ecommerce] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ecommerce] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ecommerce] SET  MULTI_USER 
GO
ALTER DATABASE [ecommerce] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ecommerce] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ecommerce] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ecommerce] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ecommerce] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ecommerce] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ecommerce] SET QUERY_STORE = ON
GO
ALTER DATABASE [ecommerce] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ecommerce]
GO
/****** Object:  Table [dbo].[address]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[address](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[street_name] [nvarchar](100) NOT NULL,
	[city] [nvarchar](50) NOT NULL,
	[region] [nvarchar](50) NOT NULL,
	[district] [nvarchar](50) NOT NULL,
	[country] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_d92de1f82754668b5f5f5dd4fd5] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[admin]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](255) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[full_name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_e032310bcef831fb83101899b10] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cart]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
 CONSTRAINT [PK_c524ec48751b9b5bcfbf6e59be7] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cart_item]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart_item](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NOT NULL,
	[cart_id] [int] NULL,
	[product_item_id] [int] NULL,
 CONSTRAINT [PK_bd94725aa84f8cf37632bcde997] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[parentId] [int] NULL,
 CONSTRAINT [PK_9c4e4a89e3674fc9f382d733f03] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[color]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[color](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[color_code] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_d15e531d60a550fbf23e1832343] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[image]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[image](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[image_url] [nvarchar](255) NOT NULL,
	[productItemId] [int] NULL,
 CONSTRAINT [PK_d6db1ab4ee9ad9dbe86c64e4cc3] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[migrations]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[migrations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[timestamp] [bigint] NOT NULL,
	[name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_8c82d7f526340ab734260ea46be] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[orderDate] [datetime2](7) NOT NULL,
	[order_total] [decimal](10, 2) NOT NULL,
	[user_id] [int] NULL,
	[shipping_address_id] [int] NULL,
	[shipping_method_id] [int] NULL,
	[order_status_id] [int] NULL,
	[guest_name] [nvarchar](255) NULL,
	[guest_email] [nvarchar](255) NULL,
	[guest_phone] [nvarchar](255) NULL,
 CONSTRAINT [PK_1031171c13130102495201e3e20] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_item]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_item](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NULL,
	[product_item_id] [int] NULL,
	[quantity] [decimal](10, 2) NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_d01158fe15b1ead5c26fd7f4e90] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_payment]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_payment](
	[order_id] [int] NOT NULL,
	[payment_id] [int] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_f8f878798e28627d918aa267c46] PRIMARY KEY CLUSTERED 
(
	[order_id] ASC,
	[payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_status]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_status](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_8ea75b2a26f83f3bc98b9c6aaf6] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payment]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[payment_method] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_fcaec7df5adf9cac408c686b2ab] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](255) NULL,
	[category_id] [int] NULL,
	[all_rate] [float] NOT NULL,
 CONSTRAINT [PK_bebc9158e480b949565b4dc7a82] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_item]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_item](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
	[product_id] [int] NULL,
	[size_id] [int] NULL,
	[color_id] [int] NULL,
 CONSTRAINT [PK_83c3b7a80f6fe1d5ad7fa05a2a2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_promotion]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_promotion](
	[product_id] [int] NOT NULL,
	[promotion_id] [int] NOT NULL,
 CONSTRAINT [PK_a5bad981de3e7598c32e2181bf0] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC,
	[promotion_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[promotion]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[promotion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[start_at] [datetime] NOT NULL,
	[end_at] [datetime] NOT NULL,
	[discount_rate] [decimal](5, 2) NOT NULL,
 CONSTRAINT [PK_fab3630e0789a2002f1cadb7d38] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[review]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[review](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rate] [decimal](2, 1) NOT NULL,
	[create_at] [datetime] NOT NULL,
	[order_item_id] [int] NULL,
 CONSTRAINT [PK_2e4299a343a81574217255c00ca] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shipping_method]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[shipping_method](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_b9b0adfad3c6b99229c1e7d4865] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[size]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[size](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_66e3a0111d969aa0e5f73855c7a] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](255) NOT NULL,
	[hash_password] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[keycloak_id] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_cace4a159ff9f2512dd42373760] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_address]    Script Date: 6/17/2025 7:17:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_address](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[address_id] [int] NOT NULL,
	[is_default] [nvarchar](255) NOT NULL,
	[addressId] [int] NULL,
 CONSTRAINT [PK_29d6df815a78e4c8291d3cf5e53] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[address] ON 

INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (1, N'123 Đường ABC', N'Hà Nội', N'Miền Bắc', N'Cầu Giấy', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (2, N'man thien', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (3, N'man thien', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (4, N'man thien', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (5, N'sssss', N'sssssss', N'sssss', N'ssssssss', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (6, N'97 man thien hiep phu', N'thanh phu thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (7, N'quan 9', N' fff', N'fff', N'111', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (8, N'hhhhn', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (9, N'hhhhn', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (10, N'aaaaa', N'aaaa', N'eeeeee', N'dddd', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (11, N'aaaaa', N'aaaa', N'eeeeee', N'dddd', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (12, N'aaaaa', N'aaaa', N'eeeeee', N'dddd', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (13, N'aaaaa', N'aaaa', N'eeeeee', N'dddd', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (14, N'aaaaa', N'aaaa', N'eeeeee', N'dddd', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (15, N'nguyenss', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (16, N'123 man thien', N'thu duc ', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (17, N'Nguyen cam ', N'thu duc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (18, N'hahahah', N'hihi', N'nam', N'huhu', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (19, N'aabb', N'aaaa', N'gggg', N'aaaa', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (20, N'cccc', N'wwww', N'fffff', N'ddd', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (21, N'hahaha', N'thu đuc', N'nam', N'quan 9', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (22, N'1231312', N'111', N'nam', N'son hoa', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (23, N'1231312', N'111', N'nam', N'son hoa', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (24, N'nguyen cam', N'tuy hoa', N'nam', N'son hoa', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (25, N'aaaa', N'aaa', N'aaa', N'aaa', N'Việt Nam')
INSERT [dbo].[address] ([id], [street_name], [city], [region], [district], [country]) VALUES (26, N'aaaa', N'aaa', N'aaa', N'aaa', N'Việt Nam')
SET IDENTITY_INSERT [dbo].[address] OFF
GO
SET IDENTITY_INSERT [dbo].[category] ON 

INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (1, N'Clothing', NULL)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (2, N'Swimwear', NULL)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (3, N'Accessories', NULL)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (4, N'Blazer', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (5, N'Cardigan', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (6, N'Skirt', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (7, N'Jacket', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (8, N'Dress', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (9, N'Jewelry', 3)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (10, N'ShoesAndBags', 3)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (11, N'Denim', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (13, N'Shorts', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (14, N'OnePiece', NULL)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (17, N'haha1234â', NULL)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (1016, N'huyhuyhuy', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (1017, N'a', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (1018, N'aaabb', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (1019, N'abcd', 1)
INSERT [dbo].[category] ([id], [name], [parentId]) VALUES (1020, N'hihi', 2)
SET IDENTITY_INSERT [dbo].[category] OFF
GO
SET IDENTITY_INSERT [dbo].[color] ON 

INSERT [dbo].[color] ([id], [name], [color_code]) VALUES (1, N'Red', N'#FF0000')
INSERT [dbo].[color] ([id], [name], [color_code]) VALUES (2, N'Blue', N'#0000FF')
INSERT [dbo].[color] ([id], [name], [color_code]) VALUES (3, N'Green', N'#008000')
INSERT [dbo].[color] ([id], [name], [color_code]) VALUES (4, N'Yellow', N'#FFFF00')
INSERT [dbo].[color] ([id], [name], [color_code]) VALUES (5, N'Pink', N'#FFC0CB')
SET IDENTITY_INSERT [dbo].[color] OFF
GO
SET IDENTITY_INSERT [dbo].[image] ON 

INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (1, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020647/products/product_2_img_1.jpg', 2)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (2, N'https://stitched-lb.com/wp-content/uploads/2025/03/ATTILAA.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (3, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020649/products/product_5_img_3.jpg', 5)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (4, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020650/products/product_6_img_4.jpg', 6)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (5, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020651/products/product_7_img_5.jpg', 7)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (6, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020652/products/product_8_img_6.jpg', 8)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (7, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020653/products/product_9_img_7.jpg', 9)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (8, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020655/products/product_10_img_8.jpg', 10)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (9, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020656/products/product_11_img_9.jpg', 11)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (10, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020657/products/product_12_img_10.jpg', 12)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (11, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020658/products/product_15_img_11.jpg', 15)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (12, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020659/products/product_16_img_12.jpg', 16)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (13, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020660/products/product_17_img_13.jpg', 17)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (14, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020661/products/product_18_img_14.jpg', 18)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (15, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020662/products/product_19_img_15.jpg', 19)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (16, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020663/products/product_42_img_16.jpg', 42)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (17, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020664/products/product_43_img_17.jpg', 43)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (18, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020665/products/product_44_img_18.webp', 44)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (19, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020666/products/product_45_img_19.jpg', 45)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (20, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020667/products/product_46_img_20.webp', 46)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (21, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020668/products/product_47_img_21.webp', 47)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (22, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020670/products/product_57_img_22.png', 57)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (23, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020671/products/product_58_img_23.png', 58)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (24, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020672/products/product_59_img_24.webp', 59)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (25, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020673/products/product_60_img_25.webp', 60)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (26, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020675/products/product_61_img_26.jpg', 61)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (27, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020676/products/product_62_img_27.jpg', 62)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (28, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020677/products/product_63_img_28.jpg', 63)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (29, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020678/products/product_64_img_29.jpg', 64)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (30, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020679/products/product_65_img_30.webp', 65)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (31, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020680/products/product_66_img_31.webp', 66)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (32, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020681/products/product_95_img_32.jpg', 95)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (33, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020682/products/product_96_img_33.jpg', 96)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (34, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020683/products/product_97_img_34.jpg', 97)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (35, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020684/products/product_98_img_35.jpg', 98)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (36, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020685/products/product_99_img_36.jpg', 99)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (37, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020686/products/product_100_img_37.webp', 100)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (38, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020687/products/product_101_img_38.webp', 101)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (39, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020688/products/product_102_img_39.jpg', 102)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (40, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020690/products/product_103_img_40.avif', 103)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (41, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020691/products/product_104_img_41.webp', 104)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (42, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020692/products/product_105_img_42.webp', 105)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (43, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020693/products/product_106_img_43.webp', 106)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (44, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020694/products/product_107_img_44.webp', 107)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (45, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020696/products/product_153_img_45.webp', 153)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (46, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020697/products/product_154_img_46.jpg', 154)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (47, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020698/products/product_155_img_47.webp', 155)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (48, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020699/products/product_156_img_48.webp', 156)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (49, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020700/products/product_157_img_49.jpg', 157)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (50, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020701/products/product_158_img_50.avif', 158)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (51, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020703/products/product_159_img_51.webp', 159)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (52, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020704/products/product_160_img_52.webp', 160)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (53, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020705/products/product_161_img_53.webp', 161)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (54, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020706/products/product_162_img_54.webp', 162)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (55, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020707/products/product_163_img_55.webp', 163)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (56, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020708/products/product_164_img_56.webp', 164)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (57, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020710/products/product_165_img_57.webp', 165)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (58, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020711/products/product_166_img_58.png', 166)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (59, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020712/products/product_167_img_59.webp', 167)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (60, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020714/products/product_168_img_60.webp', 168)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (61, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020714/products/product_169_img_61.jpg', 169)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (62, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020716/products/product_170_img_62.jpg', 170)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (63, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020717/products/product_171_img_63.webp', 171)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (64, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020718/products/product_172_img_64.jpg', 172)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (65, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020719/products/product_173_img_65.jpg', 173)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (66, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020720/products/product_174_img_66.avif', 174)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (67, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020721/products/product_175_img_67.avif', 175)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (68, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020723/products/product_176_img_68.webp', 176)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (69, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020724/products/product_177_img_69.webp', 177)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (70, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020725/products/product_186_img_70.webp', 186)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (71, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020726/products/product_187_img_71.webp', 187)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (72, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020727/products/product_188_img_72.webp', 188)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (73, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020728/products/product_189_img_73.webp', 189)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (74, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020730/products/product_190_img_74.webp', 190)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (75, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020731/products/product_193_img_75.webp', 193)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (76, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020732/products/product_194_img_76.webp', 194)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (77, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020733/products/product_195_img_77.webp', 195)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (78, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020734/products/product_196_img_78.webp', 196)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (79, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020735/products/product_197_img_79.webp', 197)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (80, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020736/products/product_198_img_80.webp', 198)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (81, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020737/products/product_199_img_81.webp', 199)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (82, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020738/products/product_200_img_82.webp', 200)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (83, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020740/products/product_201_img_83.webp', 201)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (84, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020741/products/product_202_img_84.webp', 202)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (85, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020742/products/product_203_img_85.webp', 203)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (86, N'https://res.cloudinary.com/didpamyuv/image/upload/v1748020743/products/product_204_img_86.jpg', 204)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (87, N'https://stitched-lb.com/wp-content/uploads/2025/04/BLUE.avif', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (88, N'https://stitched-lb.com/wp-content/uploads/2025/04/BLACK.avif', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (89, N'https://stitched-lb.com/wp-content/uploads/2025/03/ARII-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (90, N'https://stitched-lb.com/wp-content/uploads/2025/03/BLUE-DRESS-320x481.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (91, N'https://stitched-lb.com/wp-content/uploads/2025/03/BRI-DRESS-320x427.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (92, N'https://stitched-lb.com/wp-content/uploads/2025/03/CELINDAA2-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (93, N'https://stitched-lb.com/wp-content/uploads/2025/03/BLACK-DUA-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (94, N'https://stitched-lb.com/wp-content/uploads/2025/03/JIJI-320x400.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (95, N'https://stitched-lb.com/wp-content/uploads/2025/03/ISLA-MAXI-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (96, N'https://stitched-lb.com/wp-content/uploads/2025/03/LEXI-DRESS-320x481.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (97, N'https://stitched-lb.com/wp-content/uploads/2025/03/OAT-DRESS-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (98, N'https://stitched-lb.com/wp-content/uploads/2025/03/PUROLE-BAOBAB-320x481.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (99, N'https://stitched-lb.com/wp-content/uploads/2025/03/BLACK-BAOBAB-320x480.webp', NULL)
GO
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (100, N'https://stitched-lb.com/wp-content/uploads/2025/03/CROCHET-320x400.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (101, N'https://stitched-lb.com/wp-content/uploads/2025/03/NIA-DRESS-320x481.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (102, N'https://stitched-lb.com/wp-content/uploads/2025/03/GREEN-DRESS-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (103, N'https://stitched-lb.com/wp-content/uploads/2025/03/SAULEE-D-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (104, N'https://stitched-lb.com/wp-content/uploads/2025/03/VIVIENE-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (105, N'https://stitched-lb.com/wp-content/uploads/2025/03/win-1-1-320x386.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (106, N'https://stitched-lb.com/wp-content/uploads/2025/03/courtney-one-320x386.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (107, N'https://stitched-lb.com/wp-content/uploads/2024/08/ezgif-2-89d1729a61-320x400.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (108, N'https://stitched-lb.com/wp-content/uploads/2025/03/26732_BLUETOBACCO_1SHORT-320x386.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (109, N'https://stitched-lb.com/wp-content/uploads/2025/03/short-1-320x386.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (110, N'https://stitched-lb.com/wp-content/uploads/2024/10/IMG_8811_c168e0f6-dc97-4c46-b739-6264af922999_640x-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (111, N'https://stitched-lb.com/wp-content/uploads/2024/05/ezgif-5-ded6cf1048-320x400.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (112, N'https://stitched-lb.com/wp-content/uploads/2024/06/AFFM-WF13_V1-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (113, N'https://stitched-lb.com/wp-content/uploads/2025/03/BAOBAB-green-skirt-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (114, N'https://stitched-lb.com/wp-content/uploads/2025/03/PAREO-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (115, N'https://stitched-lb.com/wp-content/uploads/2025/03/DOLLY-SET-320x481.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (116, N'https://stitched-lb.com/wp-content/uploads/2025/03/LUCIII-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (117, N'https://stitched-lb.com/wp-content/uploads/2025/03/NIA-SK-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (118, N'https://stitched-lb.com/wp-content/uploads/2025/03/26580_MEMPHIS_1SKIRT-320x386.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (119, N'https://stitched-lb.com/wp-content/uploads/2024/10/384049KNT-DawnCardigan_1_-min_900x-320x491.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (120, N'https://stitched-lb.com/wp-content/uploads/2024/10/381936SUI-BerniceSkirt_1_-min_900x-320x491.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (121, N'https://stitched-lb.com/wp-content/uploads/2024/10/0-6-320x480.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (122, N'https://stitched-lb.com/wp-content/uploads/2024/09/elixir-maxi-skirt-816890-320x480.webp', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (123, N'https://stitched-lb.com/wp-content/uploads/2024/04/ezgif-5-78432ed3af-320x480.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (124, N'https://stitched-lb.com/wp-content/uploads/2024/08/ezgif-2-89d1729a61-320x400.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (125, N'https://stitched-lb.com/wp-content/uploads/2023/07/867-320x480.jpg', NULL)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (135, N'https://stitched-lb.com/wp-content/uploads/2025/04/BLUE.avif', 218)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (136, N'https://stitched-lb.com/wp-content/uploads/2025/04/BLACK.avif', 218)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (138, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749145498/products/skscp1ccyphg3bi1re7p.png', 219)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (139, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749145555/products/s14xfjtj0a4hldrvsyqs.png', 219)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (140, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749232354/products/mjwz8ttltunj429xor6t.png', 220)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (141, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749622842/products/jjvqqonrbzpkldul2kvj.png', 221)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (142, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749623054/products/wh0pkem2dofocfqy1fmb.png', 222)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (144, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749626078/products/lvrgmgsxfifflfwmp2iz.png', 223)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (145, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749974324/products/hvwaumycizhmscutahhp.jpg', 224)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (146, N'https://res.cloudinary.com/didpamyuv/image/upload/v1749974348/products/mmv2kzazualkkuyeyitj.jpg', 225)
INSERT [dbo].[image] ([id], [image_url], [productItemId]) VALUES (147, N'https://res.cloudinary.com/didpamyuv/image/upload/v1750091823/products/rrh9fj1ss8jldqmjlgqm.jpg', 226)
SET IDENTITY_INSERT [dbo].[image] OFF
GO
SET IDENTITY_INSERT [dbo].[order] ON 

INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (1, CAST(N'2025-04-23T14:51:50.2266667' AS DateTime2), CAST(350000.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (2, CAST(N'2025-04-23T14:57:27.0500000' AS DateTime2), CAST(195.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (3, CAST(N'2025-04-23T15:22:00.0700000' AS DateTime2), CAST(385.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (4, CAST(N'2025-04-23T15:33:50.0766667' AS DateTime2), CAST(385.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (5, CAST(N'2025-04-23T15:43:39.4300000' AS DateTime2), CAST(980.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (6, CAST(N'2025-05-14T13:22:44.5166667' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (8, CAST(N'2025-05-23T13:42:29.3800000' AS DateTime2), CAST(385.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (9, CAST(N'2025-05-23T13:42:36.9233333' AS DateTime2), CAST(385.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (10, CAST(N'2025-05-26T22:59:47.6233333' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (11, CAST(N'2025-05-26T23:08:54.0600000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (12, CAST(N'2025-05-27T14:24:24.3833333' AS DateTime2), CAST(95.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (13, CAST(N'2025-05-27T17:38:18.2966667' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (14, CAST(N'2025-05-27T18:24:21.8000000' AS DateTime2), CAST(50.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (15, CAST(N'2025-05-28T00:44:23.8400000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (16, CAST(N'2025-05-28T02:39:51.8533333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (17, CAST(N'2025-05-28T03:13:06.7933333' AS DateTime2), CAST(50.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (18, CAST(N'2025-05-28T03:15:54.0866667' AS DateTime2), CAST(275.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (19, CAST(N'2025-05-28T03:16:40.9633333' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (20, CAST(N'2025-05-28T03:33:29.4766667' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (21, CAST(N'2025-05-28T03:40:57.3033333' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (22, CAST(N'2025-05-28T03:45:21.8400000' AS DateTime2), CAST(95.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (23, CAST(N'2025-05-28T03:48:05.1800000' AS DateTime2), CAST(250.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (24, CAST(N'2025-05-28T03:50:21.2766667' AS DateTime2), CAST(250.00 AS Decimal(10, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (25, CAST(N'2025-05-28T03:51:41.1300000' AS DateTime2), CAST(250.00 AS Decimal(10, 2)), NULL, 1, 1, 2, N'Nguyễn Văn A', N'a@gmail.com', N'0912345678')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (26, CAST(N'2025-05-28T03:54:51.2800000' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, 4, 1, 2, N'aaaa', N'aaaa', N'3432432432')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (27, CAST(N'2025-05-30T11:37:01.3133333' AS DateTime2), CAST(200.00 AS Decimal(10, 2)), NULL, 5, 1, 2, N'huy ', N'huyjuan2004@gmail.com', N'13213213')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (28, CAST(N'2025-05-30T13:15:57.3266667' AS DateTime2), CAST(750.00 AS Decimal(10, 2)), NULL, 6, 1, 2, N'nhat huy', N'huyjuan2004@gmail.com', N'094560001')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (29, CAST(N'2025-06-12T10:25:46.6900000' AS DateTime2), CAST(200.00 AS Decimal(10, 2)), NULL, 7, 1, 2, N'abcd', N'huyjuan2004@gmail.com', N'01939238')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (30, CAST(N'2025-06-12T10:35:37.2033333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 8, 1, 2, N'sssaaa', N'huyjuan2004@gmail.com', N'094657811')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (31, CAST(N'2025-06-12T10:35:50.7100000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 9, 1, 2, N'sssaaa', N'huyjuan2004@gmail.com', N'094657811')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (32, CAST(N'2025-06-12T10:43:20.3633333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 10, 1, 2, N'ddddd', N'huyjuan2004@gmail.com', N'019328311')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (33, CAST(N'2025-06-12T10:47:22.9333333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 11, 1, 3, N'ddddd', N'huyjuan2004@gmail.com', N'019328311')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (34, CAST(N'2025-06-12T10:49:14.6400000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 12, 1, 2, N'ddddd', N'huyjuan2004@gmail.com', N'019328311')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (35, CAST(N'2025-06-12T10:52:26.5933333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 13, 1, 2, N'ddddd', N'huyjuan2004@gmail.com', N'019328311')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (36, CAST(N'2025-06-12T10:55:40.8766667' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 14, 1, 1, N'ddddd', N'huyjuan2004@gmail.com', N'019328311')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (37, CAST(N'2025-06-12T13:24:06.9433333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 15, 1, 1, N'nguyễn', N'huyjuan2004@gmail.com', N'093412711')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (38, CAST(N'2025-06-12T13:38:09.4100000' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, 16, 1, 1, N'nguyen le nhat huy', N'huyjuan2004@gmail.com', N'0945604717')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (39, CAST(N'2025-06-12T16:00:17.0700000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 17, 1, 1, N'Nguyễn lÊ Nhật Huy', N'huyjuan2004@gmail.com', N'094560221')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (40, CAST(N'2025-06-12T16:12:10.0300000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 18, 1, 1, N'huhy', N'huyjuan2004@gmail.com', N'301010011')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (41, CAST(N'2025-06-12T16:16:05.0533333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 19, 1, 1, N'a', N'b', N'3333')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (42, CAST(N'2025-06-12T16:18:43.0733333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 20, 1, 1, N'aaa', N'bbb', N'aa')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (43, CAST(N'2025-06-13T12:56:10.4933333' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 21, 1, 1, N'huy', N'huyjuan2004@gmail.com', N'094621171')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (44, CAST(N'2025-06-15T15:15:13.7900000' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 22, 1, 1, N'avba', N'huyjuan2004@gmail.com', N'0945604717')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (45, CAST(N'2025-06-15T15:17:40.7866667' AS DateTime2), CAST(335.00 AS Decimal(10, 2)), NULL, 23, 1, 1, N'avba', N'huyjuan2004@gmail.com', N'0945604717')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (46, CAST(N'2025-06-15T15:32:49.6900000' AS DateTime2), CAST(105.00 AS Decimal(10, 2)), NULL, 24, 1, 1, N'âc', N'huyjuan2004@gmail.com', N'01913213')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (47, CAST(N'2025-06-15T15:35:45.5700000' AS DateTime2), CAST(200.00 AS Decimal(10, 2)), NULL, 25, 1, 1, N'a', N'huyjuan2004@gmail.com', N'22312')
INSERT [dbo].[order] ([id], [orderDate], [order_total], [user_id], [shipping_address_id], [shipping_method_id], [order_status_id], [guest_name], [guest_email], [guest_phone]) VALUES (48, CAST(N'2025-06-15T15:37:24.5366667' AS DateTime2), CAST(200.00 AS Decimal(10, 2)), NULL, 26, 1, 1, N'a', N'huyjuan2004@gmail.com', N'22312')
SET IDENTITY_INSERT [dbo].[order] OFF
GO
SET IDENTITY_INSERT [dbo].[order_item] ON 

INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (1, 26, 57, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (2, 27, 5, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (3, 28, 5, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (4, 28, 6, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (5, 28, 7, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (6, 28, 9, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (7, 29, 5, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (8, 30, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (9, 31, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (10, 32, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (11, 33, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (12, 34, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (13, 35, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (14, 36, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (15, 37, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (16, 38, 57, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (17, 39, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (18, 40, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (19, 41, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (20, 42, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (21, 43, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (22, 44, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (23, 45, 15, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (24, 46, 57, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (25, 47, 5, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[order_item] ([id], [order_id], [product_item_id], [quantity], [price]) VALUES (26, 48, 5, CAST(1.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)))
SET IDENTITY_INSERT [dbo].[order_item] OFF
GO
SET IDENTITY_INSERT [dbo].[order_status] ON
--
INSERT [dbo].[order_status] ([id], [status]) VALUES (1, N'Shipping')
INSERT [dbo].[order_status] ([id], [status]) VALUES (2, N'Delivered')
INSERT [dbo].[order_status] ([id], [status]) VALUES (3, N'Cancelled')
INSERT [dbo].[order_status] ([id], [status]) VALUES (5, N'Preparing')
SET IDENTITY_INSERT [dbo].[order_status] OFF
GO
SET IDENTITY_INSERT [dbo].[product] ON 

INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (5, N'Manglar ', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (6, N'PRIMROSE EARRINGS', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (7, N'CITRUS EARRINGS', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (8, N'APPLE SLICE EARRINGS', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (9, N'LEMON EARRINGS', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (10, N'PEAR EARRINGS', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (11, N'MARIGOLD EARRINGS', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (12, N'SPARKLE HEART', N'NEW', 3, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (24, N'Dawn Cardigan -Dalya Skirt', N'SALE', 4, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (25, N'HANNAH CARDIGAN', N'SALE', 4, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (26, N'Jerry Jacket- Bernice Skirt', N'SALE', 4, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (27, N'Brigade Blazer', N'SALE', 4, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (28, N'Agnes Blazer', N'NEW', 4, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (29, N'Daria Checked Faux Leather Shacket – Pale Pink', N'A stylish pale pink leather shacket.', 7, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (30, N'Star Denim Wadded Jacket – Dark Memphis Blue', N'A durable denim jacket in dark blue.', 7, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (31, N'HANNAH CARDIGAN', N'A cozy cardigan perfect for winter.', 7, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (32, N'STRIPE JACKET GOLD BUCKLES', N'A striped jacket with golden buckles.', 7, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (33, N'Runaway Jacket', N'A chic jacket for all occasions.', 7, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (34, N'Finally pu Jacket', N'Elegant PU jacket with timeless style.', 7, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (36, N'Baby Classic Swim Lime', N'NEW lime-colored swimwear for babies', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (37, N'Baby Classic Swim Navy/White Stripe', N'NEW navy-white striped swimwear for babies', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (38, N'KIDS ALVA LILAC', N'NEW lilac swimwear for kids', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (39, N'KIDS ALVA STRIPE', N'NEW striped swimwear for kids', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (40, N'KIDS CLASSIC AQUA BLUE', N'NEW aqua blue swimwear for kids', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (41, N'KIDS DENISE LILAC/PURPLE', N'NEW lilac-purple swimwear for kids', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (42, N'Kids Lara Swim Lilac', N'NEW lilac swimwear for kids', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (43, N'Palm One Piece', N'NEW green one-piece swimwear', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (44, N'CARO BIKINI', N'NEW stylish bikini for women', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (45, N'ALTIA BIKINI', N'NEW bikini with elegance', 2, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (47, N'Palisades Denim Top – Memphis Star', N'Stylish Memphis Star denim top', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (48, N'Star Denim Wadded Jacket – Dark Memphis Blue', N'Classic denim jacket in dark Memphis blue', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (49, N'Everyday Denim Shirt', N'Casual and comfortable denim shirt', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (50, N'BLUE LOVE MACHINE FITTED JUMPSUIT', N'Bold and fitted denim jumpsuit', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (51, N'Taylor Denim Jumpsuit', N'Elegant denim jumpsuit for all occasions', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (52, N'Agnes Blazer', N'Sophisticated and professional blazer', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (53, N'Kendall Wide Cuff Pant', N'Stylish wide cuff pants', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (54, N'Sterling Denim Vest', N'Unique denim vest for any outfit', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (55, N'HAND-BEADED DENIM SHORTS', N'Artistic hand-beaded shorts', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (56, N'HAND-BEADED DENIM TOP – SHORT', N'Hand-beaded denim top', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (57, N'Sheyla Belted Denim Short', N'Classic belted denim shorts', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (58, N'AFTER HOURS CORSET', N'Elegant corset for after-hours fashion', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (59, N'Revive Charcoal Jeans', N'Charcoal jeans with a modern twist', 11, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (98, N'Aella Party Mini Dress In Pink', N'NEW mini party dress in pink', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (99, N'Betty Mini Dress', N'NEW Betty Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (100, N'CAMILLE DRESS LAVENDER', N'Lavender Camille Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (101, N'CAMILLE DRESS OCEAN BLUE', N'Ocean Blue Camille Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (102, N'CERA MINI DRESS', N'NEW Cera Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (103, N'Daffodil Lace Midi Dress In White', N'White daffodil lace midi dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (104, N'Darra Mini Dress in Floral', N'Floral Darra Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (105, N'Denver Party Mini Dress In Blue', N'Blue Denver Party Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (106, N'Geranium Mini Dress', N'Elegant Geranium Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (107, N'Geranium Strapless Party Dress In White', N'White strapless Geranium Party Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (108, N'GWENDOLYN DRESS', N'Sophisticated Gwendolyn Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (109, N'Janelle Mini Dress In White', N'White Janelle Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (110, N'PENELOPE BLACK', N'Elegant black Penelope dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (111, N'Reese Lace Dress', N'Luxury Reese Lace Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (112, N'Rose Mini Dress In White', N'White Rose Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (113, N'SkYE MINI DRESS', N'Sophisticated Sky Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (114, N'Zariah Midi Dress', N'Elegant Zariah Midi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (115, N'Ari Maxi Dress', N'NEW Ari Maxi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (116, N'Arrecife Maxi Dress', N'Elegant blue Arrecife Maxi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (117, N'Brigitte Maxi Dress', N'Classic Brigitte Maxi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (118, N'Celinda Mini Dress', N'Luxury Celinda Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (119, N'Dua Maxi Dress', N'Elegant black Dua Maxi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (120, N'JERSEY BRAIDED MINI DRESS', N'Stylish Jersey Braided Mini Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (121, N'Isla Maxi Dress', N'Classic Isla Maxi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (122, N'Lexi Maxi Dress', N'Elegant Lexi Maxi Dress', 8, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (123, N'Rollers Low Waist Denim Shorts – Blue Tobacco', N'Stylish low-waist denim shorts', 13, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (124, N'Renegades Shorts', N'Classic denim renegade shorts', 13, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (125, N'KNOX HOT SHORT', N'Limited edition Knox hot short', 13, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (126, N'HAND-BEADED DENIM SHORTS', N'Luxury hand-beaded denim shorts', 13, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (127, N'Sheyla Belted Denim Short', N'Elegant Sheyla belted denim shorts', 13, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (129, N'Amorino Set', N'Amorino crop top and skirt set', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (130, N'Corriente Maxi Skirt', N'Elegant Corriente Maxi Skirt', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (131, N'DOLLY EVERGREEN SET', N'Dolly Evergreen Set with stylish design', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (132, N'Lucie Maxi Skirt', N'Classic Lucie Maxi Skirt for elegant wear', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (133, N'Nia Maxi Skirt', N'Simple yet sophisticated Nia Maxi Skirt', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (134, N'Memphis High Waist Shredded Maxi Skirt – Memphis', N'Memphis shredded maxi skirt for unique style', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (135, N'Dawn Cardigan - Dalya Skirt', N'Stylish cardigan with Dalya skirt', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (136, N'Jerry Jacket - Bernice Skirt', N'Elegant Jerry jacket and Bernice skirt combo', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (137, N'LULA SKIRT', N'Casual yet elegant Lula skirt', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (138, N'Elixir Maxi Skirt', N'Chic Elixir Maxi Skirt for modern wear', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (139, N'LETTIE MICRO SKIRT', N'Stylish micro skirt for a bold look', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (140, N'FRINGE HALTER NECK TOP – SKIRT', N'Luxury fringe halter neck top with skirt', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (141, N'Under control pu Skirt', N'PU skirt for a fashionable statement', 6, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (142, N'ahiahih', N'aaaa', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (143, N'denim', N'', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (144, N'abc', N'new new', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (145, N'sdsads', N'sdsdsa', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (146, N'huyhuy', N'new', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (148, N'acss', N'sdsdsads', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (149, N'ádsadsa', N'ssss', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (150, N'ádsadsd', N'sdfdfd', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (151, N'avdg', N'sdsdsd', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (152, N'aaaa', N'', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (153, N'acvs', N'àdf', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (154, N'asdsd', N'aa', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (155, N'sdasdasd', N'a', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (156, N'sssss', N'ssss', 1, 0)
GO
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (157, N'sdsadsad', N'aaaaa', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (158, N'aaa', N'ssssss', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (160, N'adsadas', N'fdfdjsfdsnfdsnfndsf', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (161, N'fdfdfd', N'ssss', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (162, N'acsss', N'abd', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (163, N'àbbs', N'àbsbdfsad', 1, 0)
INSERT [dbo].[product] ([id], [name], [description], [category_id], [all_rate]) VALUES (164, N'avc', N'abbbb', 1, 0)
SET IDENTITY_INSERT [dbo].[product] OFF
GO
SET IDENTITY_INSERT [dbo].[product_item] ON 

INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (2, 5, CAST(195.00 AS Decimal(10, 2)), NULL, NULL, 2)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (5, 8, CAST(200.00 AS Decimal(10, 2)), 5, NULL, 5)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (6, 9, CAST(250.00 AS Decimal(10, 2)), 6, NULL, 1)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (7, 11, CAST(150.00 AS Decimal(10, 2)), 7, NULL, 2)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (8, 6, CAST(150.00 AS Decimal(10, 2)), 8, NULL, 3)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (9, 15, CAST(150.00 AS Decimal(10, 2)), 9, NULL, 4)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (10, 18, CAST(120.00 AS Decimal(10, 2)), 10, NULL, 5)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (11, 14, CAST(115.00 AS Decimal(10, 2)), 11, NULL, 1)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (12, 13, CAST(150.00 AS Decimal(10, 2)), 12, NULL, 2)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (15, 1, CAST(335.00 AS Decimal(10, 2)), 24, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (16, 1, CAST(50.00 AS Decimal(10, 2)), 25, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (17, 1, CAST(360.00 AS Decimal(10, 2)), 26, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (18, 1, CAST(218.00 AS Decimal(10, 2)), 27, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (19, 1, CAST(300.00 AS Decimal(10, 2)), 28, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (42, 10, CAST(275.00 AS Decimal(10, 2)), 29, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (43, 15, CAST(450.00 AS Decimal(10, 2)), 30, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (44, 8, CAST(125.00 AS Decimal(10, 2)), 31, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (45, 12, CAST(98.00 AS Decimal(10, 2)), 32, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (46, 20, CAST(498.00 AS Decimal(10, 2)), 33, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (47, 25, CAST(270.00 AS Decimal(10, 2)), 34, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (57, 10, CAST(105.00 AS Decimal(10, 2)), 36, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (58, 15, CAST(95.00 AS Decimal(10, 2)), 37, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (59, 8, CAST(105.00 AS Decimal(10, 2)), 38, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (60, 12, CAST(105.00 AS Decimal(10, 2)), 39, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (61, 20, CAST(105.00 AS Decimal(10, 2)), 40, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (62, 25, CAST(105.00 AS Decimal(10, 2)), 41, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (63, 30, CAST(105.00 AS Decimal(10, 2)), 42, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (64, 18, CAST(215.00 AS Decimal(10, 2)), 43, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (65, 20, CAST(245.00 AS Decimal(10, 2)), 44, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (66, 15, CAST(210.00 AS Decimal(10, 2)), 45, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (95, 11, CAST(198.00 AS Decimal(10, 2)), 47, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (96, 11, CAST(450.00 AS Decimal(10, 2)), 48, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (97, 11, CAST(225.00 AS Decimal(10, 2)), 49, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (98, 11, CAST(275.00 AS Decimal(10, 2)), 50, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (99, 11, CAST(295.00 AS Decimal(10, 2)), 51, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (100, 11, CAST(175.00 AS Decimal(10, 2)), 52, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (101, 11, CAST(145.00 AS Decimal(10, 2)), 53, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (102, 11, CAST(125.00 AS Decimal(10, 2)), 54, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (103, 11, CAST(650.00 AS Decimal(10, 2)), 55, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (104, 11, CAST(550.00 AS Decimal(10, 2)), 56, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (105, 11, CAST(125.00 AS Decimal(10, 2)), 57, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (106, 11, CAST(78.00 AS Decimal(10, 2)), 58, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (107, 11, CAST(78.00 AS Decimal(10, 2)), 59, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (153, 10, CAST(198.00 AS Decimal(10, 2)), 98, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (154, 8, CAST(375.00 AS Decimal(10, 2)), 99, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (155, 12, CAST(475.00 AS Decimal(10, 2)), 100, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (156, 6, CAST(650.00 AS Decimal(10, 2)), 101, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (157, 9, CAST(650.00 AS Decimal(10, 2)), 102, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (158, 5, CAST(480.00 AS Decimal(10, 2)), 103, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (159, 7, CAST(685.00 AS Decimal(10, 2)), 104, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (160, 14, CAST(235.00 AS Decimal(10, 2)), 105, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (161, 4, CAST(280.00 AS Decimal(10, 2)), 106, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (162, 3, CAST(225.00 AS Decimal(10, 2)), 107, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (163, 15, CAST(235.00 AS Decimal(10, 2)), 108, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (164, 18, CAST(570.00 AS Decimal(10, 2)), 109, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (165, 20, CAST(345.00 AS Decimal(10, 2)), 110, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (166, 12, CAST(570.00 AS Decimal(10, 2)), 111, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (167, 16, CAST(1400.00 AS Decimal(10, 2)), 112, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (168, 5, CAST(245.00 AS Decimal(10, 2)), 113, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (169, 6, CAST(850.00 AS Decimal(10, 2)), 114, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (170, 8, CAST(950.00 AS Decimal(10, 2)), 115, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (171, 7, CAST(295.00 AS Decimal(10, 2)), 116, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (172, 11, CAST(295.00 AS Decimal(10, 2)), 117, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (173, 9, CAST(315.00 AS Decimal(10, 2)), 118, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (174, 8, CAST(670.00 AS Decimal(10, 2)), 119, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (175, 10, CAST(375.00 AS Decimal(10, 2)), 120, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (176, 12, CAST(785.00 AS Decimal(10, 2)), 121, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (177, 6, CAST(315.00 AS Decimal(10, 2)), 122, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (186, 10, CAST(198.00 AS Decimal(10, 2)), 123, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (187, 8, CAST(375.00 AS Decimal(10, 2)), 124, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (188, 12, CAST(475.00 AS Decimal(10, 2)), 125, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (189, 6, CAST(650.00 AS Decimal(10, 2)), 126, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (190, 9, CAST(650.00 AS Decimal(10, 2)), 127, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (193, 10, CAST(415.00 AS Decimal(10, 2)), 129, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (194, 8, CAST(250.00 AS Decimal(10, 2)), 130, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (195, 12, CAST(425.00 AS Decimal(10, 2)), 131, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (196, 6, CAST(585.00 AS Decimal(10, 2)), 132, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (197, 9, CAST(190.00 AS Decimal(10, 2)), 133, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (198, 5, CAST(220.00 AS Decimal(10, 2)), 134, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (199, 7, CAST(670.00 AS Decimal(10, 2)), 135, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (200, 14, CAST(900.00 AS Decimal(10, 2)), 136, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (201, 4, CAST(140.00 AS Decimal(10, 2)), 137, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (202, 3, CAST(245.00 AS Decimal(10, 2)), 138, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (203, 15, CAST(290.00 AS Decimal(10, 2)), 139, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (204, 18, CAST(1350.00 AS Decimal(10, 2)), 140, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (205, 0, CAST(200.00 AS Decimal(10, 2)), 5, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (208, 5, CAST(2222.00 AS Decimal(10, 2)), 145, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (209, 1, CAST(1231255.00 AS Decimal(10, 2)), 146, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (210, 1, CAST(1232132.00 AS Decimal(10, 2)), 148, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (211, 11, CAST(213213.00 AS Decimal(10, 2)), 149, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (212, 22, CAST(1111.00 AS Decimal(10, 2)), 150, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (213, 2, CAST(1222.00 AS Decimal(10, 2)), 151, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (218, 23, CAST(222.00 AS Decimal(10, 2)), 156, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (219, 22, CAST(111.00 AS Decimal(10, 2)), 157, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (220, 12, CAST(222.00 AS Decimal(10, 2)), 158, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (221, 33, CAST(33.00 AS Decimal(10, 2)), 5, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (222, 11, CAST(112.00 AS Decimal(10, 2)), 160, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (223, 1, CAST(123.00 AS Decimal(10, 2)), 161, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (224, 3, CAST(123.00 AS Decimal(10, 2)), 162, NULL, NULL)
GO
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (225, 13, CAST(123.00 AS Decimal(10, 2)), 163, NULL, NULL)
INSERT [dbo].[product_item] ([id], [quantity], [price], [product_id], [size_id], [color_id]) VALUES (226, 123, CAST(123.00 AS Decimal(10, 2)), 164, NULL, NULL)
SET IDENTITY_INSERT [dbo].[product_item] OFF
GO
INSERT [dbo].[product_promotion] ([product_id], [promotion_id]) VALUES (162, 3)
INSERT [dbo].[product_promotion] ([product_id], [promotion_id]) VALUES (163, 4)
INSERT [dbo].[product_promotion] ([product_id], [promotion_id]) VALUES (164, 5)
GO
SET IDENTITY_INSERT [dbo].[promotion] ON 

INSERT [dbo].[promotion] ([id], [name], [start_at], [end_at], [discount_rate]) VALUES (1, N'Summer Sale', CAST(N'2025-05-01T07:00:00.000' AS DateTime), CAST(N'2025-06-01T06:59:59.000' AS DateTime), CAST(10.50 AS Decimal(5, 2)))
INSERT [dbo].[promotion] ([id], [name], [start_at], [end_at], [discount_rate]) VALUES (2, N'Summer Sale', CAST(N'2025-05-01T07:00:00.000' AS DateTime), CAST(N'2025-06-01T06:59:59.000' AS DateTime), CAST(10.50 AS Decimal(5, 2)))
INSERT [dbo].[promotion] ([id], [name], [start_at], [end_at], [discount_rate]) VALUES (3, N'acsss', CAST(N'2025-06-15T14:58:48.000' AS DateTime), CAST(N'2025-07-15T14:58:48.000' AS DateTime), CAST(0.05 AS Decimal(5, 2)))
INSERT [dbo].[promotion] ([id], [name], [start_at], [end_at], [discount_rate]) VALUES (4, N'àbbs', CAST(N'2025-06-15T14:59:15.000' AS DateTime), CAST(N'2025-07-15T14:59:15.000' AS DateTime), CAST(0.10 AS Decimal(5, 2)))
INSERT [dbo].[promotion] ([id], [name], [start_at], [end_at], [discount_rate]) VALUES (5, N'avc', CAST(N'2025-06-16T23:37:19.000' AS DateTime), CAST(N'2025-07-16T23:37:19.000' AS DateTime), CAST(0.10 AS Decimal(5, 2)))
SET IDENTITY_INSERT [dbo].[promotion] OFF
GO
SET IDENTITY_INSERT [dbo].[review] ON 

INSERT [dbo].[review] ([id], [rate], [create_at], [order_item_id]) VALUES (3, CAST(4.5 AS Decimal(2, 1)), CAST(N'2025-04-18T15:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[review] OFF
GO
SET IDENTITY_INSERT [dbo].[shipping_method] ON 

INSERT [dbo].[shipping_method] ([id], [name], [price]) VALUES (1, N'Giao hàng tiêu chuẩn', CAST(25000.00 AS Decimal(10, 2)))
SET IDENTITY_INSERT [dbo].[shipping_method] OFF
GO
SET IDENTITY_INSERT [dbo].[size] ON 

INSERT [dbo].[size] ([id], [name]) VALUES (2, N'L')
SET IDENTITY_INSERT [dbo].[size] OFF
GO
SET IDENTITY_INSERT [dbo].[user] ON 

INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (1, N'huy123', N'$2b$10$SZ3MEjwmVrdFcFuMBkYDpOINRzaTZh7lXyc0cNPG1jGhUaKL3Jjye', N'0901234567', N'huy@example.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (2, N'huy1234', N'$2b$10$xjaeIaCCETVNTZ.UazazUO.mEHnM9kBhzzqyHiiOsBZbY2eZDuoWW', N'0912312311', N'huyjuan20041@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (3, N'huy12345', N'$2b$10$EDmwfjsXxFBTyVYYCa/c/eg1Mz0oyUiP8m5OAnwUrSvTJC0HWPk.u', N'0912312312', N'huyjuan20042@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (4, N'huy123456', N'$2b$10$oYXpCxa2BOYg7Q6zzJZVF.HyKZ5F9EUG2bp00Vgr3zFJ4igCYsgI.', N'0193213291', N'huyjuan20043@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (5, N'huy1234567', N'$2b$10$yXIU5Rn7XOo0aSZVCBQXlehk/LwmQZhkwVu8ZGpmLDKyDklurBm66', N'0936467271', N'huyjuan20048@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (6, N'huy12345672312', N'$2b$10$CS2AZNWnfvWB/t9a94wEzOaIV4XDbk5qMjXheD27F/f.G.RxBCya2', N'231312312', N'aaa111a@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (7, N'huy123456723122', N'$2b$10$ytlR81tXm60qKx90JRnUTuKBddy2pLCZ1OIyUp6Xm9BiOIWqS9PN2', N'123091232', N'huyjuan20042@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (8, N'huy1234567231223', N'$2b$10$xB7HLNO1kdV05B0aGQtOiO6m6FfBTUr4CB7zSICYllbaDEzkEfzzi', N'0945604717', N'huyjuan20044@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (9, N'huy1234567231221', N'$2b$10$Mh/rGl.BISgk/b8BGGpnI.n/fD4EU/tp2yM/Pnz7NInElKlTBiuP6', N'091313132', N'huaayjuan200432122321@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (10, N'huy123456723122131231', N'$2b$10$4yjgEsazfOrVEjF4c25pROH/BXK2YT6PwMWBMWepOQDejc3eONRbC', N'138213123', N'huyjuan20041412412@gmail.com', N'')
INSERT [dbo].[user] ([id], [username], [hash_password], [phone], [email], [keycloak_id]) VALUES (11, N'huy123456723122111', N'$2b$10$AWFwwiku4xbQoNI2qLN5tOI.gb9uYXgfmWOPeFD/zkFj.IZSpkAPG', N'123123123', N'huyjuan200312314@gmail.com', N'')
SET IDENTITY_INSERT [dbo].[user] OFF
GO
-- SET IDENTITY_INSERT [dbo].[user_address] ON
--     GO
--     SET IDENTITY_INSERT [dbo].[order_status] ON
--
--     INSERT [dbo].[order_status] ([id], [status]) VALUES (1, N'Shipping')
--     INSERT [dbo].[order_status] ([id], [status]) VALUES (2, N'Delivered')
--     INSERT [dbo].[order_status] ([id], [status]) VALUES (3, N'Cancelled')
--     INSERT [dbo].[order_status] ([id], [status]) VALUES (5, N'Preparing')
--     SET IDENTITY_INSERT [dbo].[order_status] OFF
--     GO
INSERT [dbo].[user_address] ([user_id], [address_id], [is_default], [addressId]) VALUES (1, 5, N'true', NULL)
SET IDENTITY_INSERT [dbo].[user_address] OFF
GO
ALTER TABLE [dbo].[order] ADD  CONSTRAINT [DF_48bfb52a15389bdc9f4af3aec29]  DEFAULT (getdate()) FOR [orderDate]
GO
ALTER TABLE [dbo].[order_item] ADD  CONSTRAINT [DF_29775bd3e64824335a31a86432e]  DEFAULT ((1)) FOR [quantity]
GO
ALTER TABLE [dbo].[order_item] ADD  CONSTRAINT [DF_6e00883bee0ff79a0cd30a6802f]  DEFAULT ((0)) FOR [price]
GO
ALTER TABLE [dbo].[order_payment] ADD  CONSTRAINT [DF_48a6539d206eab945abab10b57b]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[product] ADD  CONSTRAINT [DF_cd774083a4e723cad8d1ebfaa0c]  DEFAULT ((0)) FOR [all_rate]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_7dbb864d96a41e12fe53e016f21]  DEFAULT ('') FOR [keycloak_id]
GO
ALTER TABLE [dbo].[cart]  WITH CHECK ADD  CONSTRAINT [FK_f091e86a234693a49084b4c2c86] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[cart] CHECK CONSTRAINT [FK_f091e86a234693a49084b4c2c86]
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD  CONSTRAINT [FK_a5321e5c464ec521a3f863df032] FOREIGN KEY([product_item_id])
REFERENCES [dbo].[product_item] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[cart_item] CHECK CONSTRAINT [FK_a5321e5c464ec521a3f863df032]
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD  CONSTRAINT [FK_b6b2a4f1f533d89d218e70db941] FOREIGN KEY([cart_id])
REFERENCES [dbo].[cart] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[cart_item] CHECK CONSTRAINT [FK_b6b2a4f1f533d89d218e70db941]
GO
ALTER TABLE [dbo].[category]  WITH CHECK ADD  CONSTRAINT [FK_d5456fd7e4c4866fec8ada1fa10] FOREIGN KEY([parentId])
REFERENCES [dbo].[category] ([id])
GO
ALTER TABLE [dbo].[category] CHECK CONSTRAINT [FK_d5456fd7e4c4866fec8ada1fa10]
GO
ALTER TABLE [dbo].[image]  WITH CHECK ADD  CONSTRAINT [FK_8f0d1d52300d02e8a1e3b6dafd8] FOREIGN KEY([productItemId])
REFERENCES [dbo].[product_item] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[image] CHECK CONSTRAINT [FK_8f0d1d52300d02e8a1e3b6dafd8]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_199e32a02ddc0f47cd93181d8fd] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_199e32a02ddc0f47cd93181d8fd]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_19b0c6293443d1b464f604c3316] FOREIGN KEY([shipping_address_id])
REFERENCES [dbo].[address] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_19b0c6293443d1b464f604c3316]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_6283d0ef6e09502a9ed38da83b1] FOREIGN KEY([order_status_id])
REFERENCES [dbo].[order_status] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_6283d0ef6e09502a9ed38da83b1]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK_725d8733eda9a49f0bd19ab6174] FOREIGN KEY([shipping_method_id])
REFERENCES [dbo].[shipping_method] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK_725d8733eda9a49f0bd19ab6174]
GO
ALTER TABLE [dbo].[order_item]  WITH CHECK ADD  CONSTRAINT [FK_6b6dd8c378acdda74832bf119a3] FOREIGN KEY([product_item_id])
REFERENCES [dbo].[product_item] ([id])
GO
ALTER TABLE [dbo].[order_item] CHECK CONSTRAINT [FK_6b6dd8c378acdda74832bf119a3]
GO
ALTER TABLE [dbo].[order_item]  WITH CHECK ADD  CONSTRAINT [FK_e9674a6053adbaa1057848cddfa] FOREIGN KEY([order_id])
REFERENCES [dbo].[order] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_item] CHECK CONSTRAINT [FK_e9674a6053adbaa1057848cddfa]
GO
ALTER TABLE [dbo].[order_payment]  WITH CHECK ADD  CONSTRAINT [FK_8a484703f1484cb311c3ffc53f4] FOREIGN KEY([payment_id])
REFERENCES [dbo].[payment] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_payment] CHECK CONSTRAINT [FK_8a484703f1484cb311c3ffc53f4]
GO
ALTER TABLE [dbo].[order_payment]  WITH CHECK ADD  CONSTRAINT [FK_fb74ab8e4ee3d2c6e73c261d8e3] FOREIGN KEY([order_id])
REFERENCES [dbo].[order] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[order_payment] CHECK CONSTRAINT [FK_fb74ab8e4ee3d2c6e73c261d8e3]
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FK_0dce9bc93c2d2c399982d04bef1] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FK_0dce9bc93c2d2c399982d04bef1]
GO
ALTER TABLE [dbo].[product_item]  WITH CHECK ADD  CONSTRAINT [FK_2df8d93bf623763b894caf15c25] FOREIGN KEY([size_id])
REFERENCES [dbo].[size] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[product_item] CHECK CONSTRAINT [FK_2df8d93bf623763b894caf15c25]
GO
ALTER TABLE [dbo].[product_item]  WITH CHECK ADD  CONSTRAINT [FK_88ef002ea2f04e6bf896da91692] FOREIGN KEY([product_id])
REFERENCES [dbo].[product] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[product_item] CHECK CONSTRAINT [FK_88ef002ea2f04e6bf896da91692]
GO
ALTER TABLE [dbo].[product_item]  WITH CHECK ADD  CONSTRAINT [FK_e5ec8631eaf6726e9012cf44da9] FOREIGN KEY([color_id])
REFERENCES [dbo].[color] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[product_item] CHECK CONSTRAINT [FK_e5ec8631eaf6726e9012cf44da9]
GO
ALTER TABLE [dbo].[product_promotion]  WITH CHECK ADD  CONSTRAINT [FK_c2f8b731b2fee4d3b36eb71fecf] FOREIGN KEY([product_id])
REFERENCES [dbo].[product] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[product_promotion] CHECK CONSTRAINT [FK_c2f8b731b2fee4d3b36eb71fecf]
GO
ALTER TABLE [dbo].[product_promotion]  WITH CHECK ADD  CONSTRAINT [FK_ee23c184406707dda17d658b335] FOREIGN KEY([promotion_id])
REFERENCES [dbo].[promotion] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[product_promotion] CHECK CONSTRAINT [FK_ee23c184406707dda17d658b335]
GO
ALTER TABLE [dbo].[review]  WITH CHECK ADD  CONSTRAINT [FK_6fb5caf1d99ffc8dab2dcbbcf62] FOREIGN KEY([order_item_id])
REFERENCES [dbo].[order_item] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[review] CHECK CONSTRAINT [FK_6fb5caf1d99ffc8dab2dcbbcf62]
GO
ALTER TABLE [dbo].[user_address]  WITH CHECK ADD  CONSTRAINT [FK_fdd808b709b16efc1dab8df31c1] FOREIGN KEY([addressId])
REFERENCES [dbo].[address] ([id])
GO
ALTER TABLE [dbo].[user_address] CHECK CONSTRAINT [FK_fdd808b709b16efc1dab8df31c1]
GO
USE [master]
GO
ALTER DATABASE [ecommerce] SET  READ_WRITE 
GO
