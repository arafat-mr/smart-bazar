import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleProduct = (id) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
  queryKey: ["singleProduct", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/productsApproved/${id}`);
    if (!res.data) throw new Error("Product not found");
    return res.data;
  },
  enabled: !!id,
  retry: 2,
  refetchOnMount: true,
  // refetchInterval: 1000,
  staleTime: 0,
});
};

export default useSingleProduct;
