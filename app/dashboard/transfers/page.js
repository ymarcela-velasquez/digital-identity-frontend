import { Transfer } from '@/components/custom/Transfer'
import axios from 'axios'

const fetchOperators = async () => {
  try {
    const response = await axios.get(`https://govcarpeta-21868b7e9dd3.herokuapp.com/apis/getOperators`)
    return response.data
  } catch (error) {
    return []
  }
}

export default async function TransferPage() {
 const operators = await fetchOperators()

 const transformedData = operators.map(item => ({
    value: item._id,
    label: item.operatorName
  }))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Transfer operators={transformedData}/>
    </main>
  );
}
