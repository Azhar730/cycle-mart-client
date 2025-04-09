import Button from "@/components/Button/Button";
import Loading from "@/components/Loading";
import { useVerifyOrderQuery } from "@/Redux/features/order/order.api";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData: OrderData = data?.data?.[0];

  return isLoading ? (
    <Loading />
  ) : (
    <div className="mt-32 md:mt-40 w-[90%] md:w-[88%] mx-auto mb-16">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-semibold">Order ID:</dt>
            <dd>{orderData?.order_id}</dd>
            <dt className="font-semibold">Amount:</dt>
            <dd>
              {orderData?.currency} {orderData?.amount?.toFixed(2)}
            </dd>
            <dt className="font-semibold">Status:</dt>
            <dd>
              <span
                className={`px-2 py-1 text-sm rounded ${
                  orderData?.bank_status === "Success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {orderData?.bank_status}
              </span>
            </dd>
            <dt className="font-semibold">Date:</dt>
            <dd>{new Date(orderData?.date_time)?.toLocaleString()}</dd>
          </dl>
        </div>

        {/* Payment Information */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-semibold">Method:</dt>
            <dd>{orderData?.method}</dd>
            <dt className="font-semibold">Transaction ID:</dt>
            <dd>{orderData?.bank_trx_id}</dd>
            <dt className="font-semibold">Invoice No:</dt>
            <dd>{orderData?.invoice_no}</dd>
            <dt className="font-semibold">SP Code:</dt>
            <dd>{orderData?.sp_code}</dd>
            <dt className="font-semibold">SP Message:</dt>
            <dd>{orderData?.sp_message}</dd>
          </dl>
        </div>

        {/* Customer Information */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-semibold">Name:</dt>
            <dd>{orderData?.name}</dd>
            <dt className="font-semibold">Email:</dt>
            <dd>{orderData?.email}</dd>
            <dt className="font-semibold">Phone:</dt>
            <dd>{orderData?.phone_no}</dd>
            <dt className="font-semibold">Address:</dt>
            <dd>{orderData?.address}</dd>
            <dt className="font-semibold">City:</dt>
            <dd>{orderData?.city}</dd>
          </dl>
        </div>

        {/* Verification Status */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Verification Status</h2>
          <div className="flex items-center gap-2">
            {orderData?.is_verify === 1 ? (
              <>
                <CheckCircle className="text-green-500" />
                <span>Verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="text-yellow-500" />
                <span>Not Verified</span>
              </>
            )}
          </div>
          <div className="mt-4">
            <Link to="/dashboard/my-orders">
              <Button text="View Orders" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
