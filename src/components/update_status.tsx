import { Switch } from '@/components/ui/switch';
import { DateInput, TimeField } from "@/components/ui/timefield"
import { Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input";


export default function Update_Status() {
    return(
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border border-primary rounded-3xl p-3">
              <h4 className="text-sm font-semibold">Update Time-Range</h4>
                <TimeField className="space-y-1">
                <Label>Start-time</Label>
                <DateInput className={"min-w-[100px]"} />
                </TimeField>
                <TimeField className="space-y-1">
                <Label>End-time</Label>
                <DateInput className={"min-w-[100px]"} />
                </TimeField>
              <Switch />
            </div>
            <div className="flex justify-between items-center border border-primary rounded-3xl p-3">
              <h4 className="text-sm font-semibold">Update Location</h4>
              <Input className="max-w-md border-primary"/>
              <Switch />
            </div>
          </div>
        </>
    )
}