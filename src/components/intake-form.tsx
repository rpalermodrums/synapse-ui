import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TableCell } from "@/components/ui/table"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import {useAddClientMutation} from "@/services/clientApi";

const clientSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  stateOrProv: z.string().optional(),
  zipOrPostal: z.string().optional(),
  preferredPronoun: z.enum(['he/him', 'she/her', 'they/them']),
  sexualOrientation: z.enum(['straight', 'gay', 'bisexual']),
  race: z.enum(['asian', 'black', 'white']),
  ethnicity: z.enum(['hispanic', 'non-hispanic']),
  maritalStatus: z.enum(['single', 'married', 'divorced']),
  preferredMethodOfContact: z.enum(['email', 'phone', 'mail']),
  primaryAreaOfConcern: z.enum(['mental-health', 'substance-use', 'physical-health']),
  secondaryAreaOfConcern: z.enum(['mental-health', 'substance-use', 'physical-health']).optional(),
  clinicalSummary: z.string().optional(),
  biopsychosocialspiritual: z.object({
    familyLivingSituation: z.string().optional(),
    financialSituation: z.string().optional(),
    socialSupports: z.string().optional(),
    pastTrauma: z.string().optional(),
    strengths: z.string().optional(),
  }),
  medicationInformation: z.object({
    currentMedication: z.string().optional(),
    pastMedication: z.string().optional(),
    familyHistory: z.string().optional(),
    medicationGoals: z.string().optional(),
  }),
  ccmInformation: z.object({
    initialCalendarMonthOfCcm: z.enum(['january', 'february', 'march']),
    acuityLevel: z.enum(['low', 'medium', 'high']),
    timeSpent: z.string().optional(),
  }),
  otherAssessments: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

export function IntakeForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema)
  });
  const [addClient, { isLoading }] = useAddClientMutation();
  console.log(errors)

  const onSubmit = async (data: ClientFormData) => {
  try {
    await addClient(data).unwrap();
    // Handle success
    alert("Form submitted successfully!");
    // Optionally, redirect the user or clear the form
  } catch (error) {
    // Handle error
    alert("An error occurred while submitting the form.");
    console.error(error);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#E3E3E3] p-6">
      <ScrollArea className="rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-800">
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">[Client] Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Controller
              name="patientId"
              control={control}
              render={({field}) => <Input {...field} className="border border-[#BDBDBD] bg-[#FFFFFF]"
                                          placeholder="Patient ID"/>}
          />
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="Patient ID"/>
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="44"/>
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="Address Line 1"/>
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="Address Line 2"/>
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="City"/>
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="State / Prov"/>
          <Input className="border border-[#BDBDBD] bg-[#FFFFFF]" placeholder="Zip or Postal"/>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="preferred-pronoun">
              <SelectValue placeholder="Preferred Pronoun"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="he/him">He/Him</SelectItem>
              <SelectItem value="she/her">She/Her</SelectItem>
              <SelectItem value="they/them">They/Them</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="sexual-orientation">
              <SelectValue placeholder="Sexual Orientation"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="straight">Straight</SelectItem>
              <SelectItem value="gay">Gay</SelectItem>
              <SelectItem value="bisexual">Bisexual</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="race">
              <SelectValue placeholder="Race"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="white">White</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="ethnicity">
              <SelectValue placeholder="Ethnicity"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="hispanic">Hispanic</SelectItem>
              <SelectItem value="non-hispanic">Non-Hispanic</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="marital-status">
              <SelectValue placeholder="Marital Status"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="preferred-method-of-contact">
              <SelectValue placeholder="Preferred Method of Contact"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="mail">Mail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">Areas Of Concern</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="primary-area-of-concern">
              <SelectValue placeholder="Primary Area of Concern"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="substance-use">Substance Use</SelectItem>
              <SelectItem value="physical-health">Physical Health</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF]" id="secondary-area-of-concern">
              <SelectValue placeholder="Secondary Area of Concern"/>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="substance-use">Substance Use</SelectItem>
              <SelectItem value="physical-health">Physical Health</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">Clinical Summary</h2>
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Clinical summary..."/>
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">Assessment Screenings</h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">GAD-7 Results</h3>
          <p className="text-sm text-[#737373] mb-4">
            The following assessment result will be associated with this intake.
          </p>
          <RadioGroup>
            <div>
              <TableCell className="font-medium">11/15/2023</TableCell>
              <TableCell>9</TableCell>
              <TableCell>Taken by patient</TableCell>
            </div>
            <div>
              <TableCell className="font-medium">11/15/2023</TableCell>
              <TableCell>5</TableCell>
              <TableCell>John Doe</TableCell>
            </div>
            <div>
              <TableCell className="font-medium">11/15/2023</TableCell>
              <TableCell>6</TableCell>
              <TableCell>John Doe</TableCell>
            </div>
          </RadioGroup>
          <Button className="mt-4 bg-[#FF7868] text-white">Do Assessment</Button>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">PHQ-9 Results</h3>
          <p className="text-sm text-[#737373] mb-4">
            There are no PHQ-9 results within the last 30 days. Please do an assessment to associate with this
            intake.
          </p>
          <Button className="bg-[#4CB6AC] text-white">Do Assessment</Button>
        </div>
        <Input className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Other Assessments"/>
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">Biopsychosocialspiritual</h2>
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Family and Living Situation"/>
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Financial Situation"/>
        <Textarea
            className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6"
            placeholder="Social Supports, Spiritual and Religious Affiliation"
        />
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Past Trauma"/>
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Strengths"/>
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">Medication Information</h2>
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Current Medication"/>
        <Textarea className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Past Medication"/>
        <Textarea
            className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6"
            placeholder="Family History of Mental health conditions, medications, and substance use"
        />
        <Input className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Medication Goals"/>
        <h2 className="text-[#091F6A] text-xl font-semibold mb-4">CCM Information</h2>
        <Select>
          <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" id="initial-calendar-month-of-ccm">
            <SelectValue placeholder="Initial Calendar Month of CCM"/>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="january">January</SelectItem>
            <SelectItem value="february">February</SelectItem>
            <SelectItem value="march">March</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" id="acuity-level">
            <SelectValue placeholder="Acuity Level"/>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Input className="border border-[#BDBDBD] bg-[#FFFFFF] mb-6" placeholder="Time Spent"/>
        <Button type="submit" disabled={isLoading} className="bg-[#FF7868] text-white">Submit</Button>
      </ScrollArea>
    </form>
  );
}
