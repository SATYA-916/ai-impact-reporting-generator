import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";




export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.products.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return api.products.list.responses[200].parse(data);
    }
  });
}

export function useGenerateReport() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data) => {
      // Input validation using the schema
      const validated = api.impactReport.generate.input.parse(data);

      const res = await fetch(api.impactReport.generate.path, {
        method: api.impactReport.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include"
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.impactReport.generate.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to generate impact report");
      }

      const responseData = await res.json();
      return api.impactReport.generate.responses[200].parse(responseData);
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });
}