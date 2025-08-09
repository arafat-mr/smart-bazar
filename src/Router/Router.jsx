import { createBrowserRouter } from "react-router";
import Home from "../Components/Home/Home";
import Root from "../LayOut/Root";
import AllProducts from "../Components/AllProducts/AllProducts";
import AuthLayOut from "../LayOut/AuthLayOut";
import LogIn from "../Components/LogIn/LogIn";
import Register from "../Components/Register/Register";
import CreateAnAdd from "../Components/VendorComponents/CreateAnAdd";
import AddProducts from "../Components/VendorComponents/AddProducts";
import DashBoard from "../DashBoard/DashBoard";
import DashbHome from "../DashBoard/DashBoardHome/DashbHome";
import MyProducts from "../Components/VendorComponents/MyProducts";
import UpdateProducts from "../Components/VendorComponents/UpdateProducts";
import MyAdvertises from "../Components/VendorComponents/MyAdvertises";
import CreateAnAd from "../Components/VendorComponents/CreateAnAdd";
import MyAdvertisements from "../Components/VendorComponents/MyAdvertises";
import AllUsers from "../Components/AdminComponents/AllUsers";
import AllAdvertisements from "../Components/AdminComponents/AllAdvertisements";
import AllProductsApproved from "../Components/AllProductsApproved";
import MarketDetails from "../Components/MarketDetails";
import ViewPriceTrends from "../Components/UserComponents/ViewPriceTrends";
import ManageWacthList from "../Components/UserComponents/ManageWacthList";
import MyOrders from "../Components/UserComponents/MyOrders";
import SingleProductsDetails from "../Components/SingleProductDetails";
import SingleProductDetails from "../Components/SingleProductDetails";
import AllOrders from "../Components/AdminComponents/AllOrders";
import ErrorPage from "../Optionals/ErrorPage";
import ErrorDashbOard from "../Optionals/ErrorDashboard";
import PrivateRoutes from "../Routes/PrivateRoutes";
import UserRoutes from "../Routes/UserRoutes";
import { User } from "lucide-react";
import VendorRoutes from "../Routes/VendorRoutes";
import AdminRoutes from "../Routes/AdminRoutes";
import Payment from "../Payments/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProductsApproved",
        Component: AllProductsApproved,
       
      },
      {
        path:'allProductsApproved/:id',
        element:<PrivateRoutes>
          <SingleProductDetails/>
        </PrivateRoutes>
        
      },
     
      {
        path:'product-details/:marketName',
        element:<PrivateRoutes>
          <MarketDetails/>
        </PrivateRoutes>
      },
      {
        path:'payment/:productId',
        Component:Payment
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashBoard",
    element:<PrivateRoutes>
      <DashBoard/>
    </PrivateRoutes>,
    // errorElement:<ErrorDashbOard/>,
    children: [
      {
        //  path:'dashbHome',
        index: true,
        Component: DashbHome,
        
      },
      // vendor 
      {
        path: "addProduct",
        element:<VendorRoutes>
          <AddProducts/>
        </VendorRoutes>
        
      },
      {
        path: "createAd",
        element:<VendorRoutes>
          <CreateAnAd/>
        </VendorRoutes>
        
      },
      {
        path: "myAdvertises",
        element:<VendorRoutes>
          <MyAdvertisements/>
        </VendorRoutes>
      },
      {
        path: "myProducts",
        element:<VendorRoutes>
          <MyProducts/>
        </VendorRoutes>
      },
      {
        path: "update-product/:id",
        Component: UpdateProducts,
      },
        //  admin 
      {
        path: "allUsers",
        element:<AdminRoutes>
          <AllUsers/>
        </AdminRoutes>
      
      },
      {
        path:'allProducts',
        element:<AdminRoutes>
          <AllProducts/>
        </AdminRoutes>
        
      },
      {
        path: "allAds",
        element:<AdminRoutes>
          <AllAdvertisements/>
        </AdminRoutes>
       
      },
      {
        path:'allOrders',
        element:<AdminRoutes>
          <AllOrders/>
        </AdminRoutes>
       
      },
      // user 
      {
        path:'viewPriceTrends',

        element:<UserRoutes>
          <ViewPriceTrends/>
        </UserRoutes>
      },
      {
        path:'watchlist',
        element:<UserRoutes>
          <ManageWacthList/>
        </UserRoutes>
      },
      {
        path:'myOrders',
        element:<UserRoutes>
          <MyOrders/>
        </UserRoutes>
       
      },
      
      {
      path: "*",
      Component: ErrorDashbOard,
    }
    ],
  },
]);
