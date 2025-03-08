import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertEventSchema } from '@shared/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date?: Date;
}

export default function EventDialog({ open, onOpenChange, date }: EventDialogProps) {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      title: '',
      date: date,
      userId: 1
    }
  });

  const mutation = useMutation({
    mutationFn: (data: any) => apiRequest('POST', '/api/events', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onOpenChange(false);
      form.reset();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Add Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
