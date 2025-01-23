
$('#example').DataTable({
    columnDefs: [
        { targets: 3, type: 'number' }, // Phone Number as string
        { targets: 4, type: 'string' }, // Postal Code as string
        { targets: 5, type: 'enum' }, // Payment Status as string
    ],
});
