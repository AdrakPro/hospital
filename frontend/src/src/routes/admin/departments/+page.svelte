<script lang="ts">
    import { fetchData, createData, updateData, deleteData } from '$lib/utils/api';
    import { BASE_URL } from '$lib/constants.ts';
    import type { Department } from '$lib/models/department';

    let departments: Department[] = [];
    let newDepartment: Partial<Department> = {
        name: '',
        bedCount: 0,
        patientCount: 0,
        doctorCount: 0,
        directorId: '',
    };
    let departmentToUpdate: Partial<Department> = {
        departmentId: '',
        name: '',
        bedCount: 0,
    };
    let updateDirector: { doctorId: string, departmentId: string } = { doctorId: '', departmentId: '' };
    let updateDoctor: { doctorId: string, departmentId: string } = { doctorId: '', departmentId: '' };
    let updatePatient: { patientId: string, departmentId: string } = { patientId: '', departmentId: '' };
    let deleteDoctor: { doctorId: string, departmentId: string } = { doctorId: '', departmentId: '' };
    let deletePatient: { patientId: string, departmentId: string } = { patientId: '', departmentId: '' };
    let transferPatient: { oldDepartmentId: string, newDepartmentId: string, patientId: string } = { oldDepartmentId: '', newDepartmentId: '', patientId: '' };

    const loadDepartments = async (): Promise<void> => {
        departments = await fetchData<Department[]>(`${BASE_URL}/departments`);
    };

    const addDepartment = async (): Promise<void> => {
        await createData(`${BASE_URL}/departments`, newDepartment);
        loadDepartments();
        newDepartment = {
            name: '',
            bedCount: 0,
            patientCount: 0,
            doctorCount: 0,
            directorId: '',
        };
    };

    const updateDepartment = async (): Promise<void> => {
        await updateData(`${BASE_URL}/departments`, departmentToUpdate);
        loadDepartments();
        departmentToUpdate = {
            departmentId: '',
            name: '',
            bedCount: 0,
        };
    };

    const deleteDepartment = async (id: string): Promise<void> => {
        await deleteData(`${BASE_URL}/departments/${id}`);
        loadDepartments();
    };

    const assignDirector = async (): Promise<void> => {
        await updateData(`${BASE_URL}/departments/${updateDirector.departmentId}/director`, { doctorId: updateDirector.doctorId });
        loadDepartments();
        updateDirector = { doctorId: '', departmentId: '' };
    };

    const assignDoctor = async (): Promise<void> => {
        await updateData(`${BASE_URL}/departments/${updateDoctor.departmentId}/doctors`, { doctorId: updateDoctor.doctorId });
        loadDepartments();
        updateDoctor = { doctorId: '', departmentId: '' };
    };

    const assignPatient = async (): Promise<void> => {
        await updateData(`${BASE_URL}/departments/${updatePatient.departmentId}/patients`, { patientId: updatePatient.patientId });
        loadDepartments();
        updatePatient = { patientId: '', departmentId: '' };
    };

    const removeDoctor = async (): Promise<void> => {
        await deleteData(`${BASE_URL}/departments/${deleteDoctor.departmentId}/doctors/${deleteDoctor.doctorId}`);
        loadDepartments();
        deleteDoctor = { doctorId: '', departmentId: '' };
    };

    const removePatient = async (): Promise<void> => {
        await deleteData(`${BASE_URL}/departments/${deletePatient.departmentId}/patients/${deletePatient.patientId}`);
        loadDepartments();
        deletePatient = { patientId: '', departmentId: '' };
    };

    const transferPatientDepartment = async (): Promise<void> => {
        await updateData(`${BASE_URL}/departments/${transferPatient.oldDepartmentId}/patients/${transferPatient.patientId}/transfer`, { newDepartmentId: transferPatient.newDepartmentId });
        loadDepartments();
        transferPatient = { oldDepartmentId: '', newDepartmentId: '', patientId: '' };
    };

    loadDepartments();
</script>

<!-- Admin Dashboard -->
<h2>Departments</h2>

<!-- Departments List Sub-section -->
<h3>Departments List</h3>
<ul>
    {#each departments as department (department.departmentId)}
        <li>
            <strong>Department ID:</strong> {department.departmentId} <br />
            <strong>Name:</strong> {department.name} <br />
            <strong>Bed Count:</strong> {department.bedCount} <br />
            <strong>Patient Count:</strong> {department.patientCount} <br />
            <strong>Doctor Count:</strong> {department.doctorCount} <br />
            <strong>Director ID:</strong> {department.directorId} <br />
            <button on:click={() => deleteDepartment(department.departmentId)}>Delete</button>
            <button on:click={() => { departmentToUpdate = { ...department }; }}>Edit</button>
        </li>
    {/each}
</ul>

<!-- Add Department Form -->
<h3>Add Department</h3>
<form on:submit|preventDefault={addDepartment}>
    <input bind:value={newDepartment.name} placeholder="Name" />
    <input bind:value={newDepartment.bedCount} type="number" placeholder="Bed Count" />
    <input bind:value={newDepartment.patientCount} type="number" placeholder="Patient Count" />
    <input bind:value={newDepartment.doctorCount} type="number" placeholder="Doctor Count" />
    <input bind:value={newDepartment.directorId} placeholder="Director ID" />
    <button type="submit">Add Department</button>
</form>

<!-- Update Department Form -->
<h3>Update Department</h3>
<form on:submit|preventDefault={updateDepartment}>
    <input bind:value={departmentToUpdate.departmentId} placeholder="Department ID" disabled />
    <input bind:value={departmentToUpdate.name} placeholder="Name" />
    <input bind:value={departmentToUpdate.bedCount} type="number" placeholder="Bed Count" />
    <button type="submit">Update Department</button>
</form>

<!-- Assign Director Form -->
<h3>Assign Director to Department</h3>
<form on:submit|preventDefault={assignDirector}>
    <input bind:value={updateDirector.doctorId} placeholder="Doctor ID" />
    <input bind:value={updateDirector.departmentId} placeholder="Department ID" />
    <button type="submit">Assign Director</button>
</form>

<!-- Assign Doctor Form -->
<h3>Assign Doctor to Department</h3>
<form on:submit|preventDefault={assignDoctor}>
    <input bind:value={updateDoctor.doctorId} placeholder="Doctor ID" />
    <input bind:value={updateDoctor.departmentId} placeholder="Department ID" />
    <button type="submit">Assign Doctor</button>
</form>

<!-- Assign Patient Form -->
<h3>Assign Patient to Department</h3>
<form on:submit|preventDefault={assignPatient}>
    <input bind:value={updatePatient.patientId} placeholder="Patient ID" />
    <input bind:value={updatePatient.departmentId} placeholder="Department ID" />
    <button type="submit">Assign Patient</button>
</form>

<!-- Remove Doctor Form -->
<h3>Remove Doctor from Department</h3>
<form on:submit|preventDefault={removeDoctor}>
    <input bind:value={deleteDoctor.doctorId} placeholder="Doctor ID" />
    <input bind:value={deleteDoctor.departmentId} placeholder="Department ID" />
    <button type="submit">Remove Doctor</button>
</form>

<!-- Remove Patient Form -->
<h3>Remove Patient from Department</h3>
<form on:submit|preventDefault={removePatient}>
    <input bind:value={deletePatient.patientId} placeholder="Patient ID" />
    <input bind:value={deletePatient.departmentId} placeholder="Department ID" />
    <button type="submit">Remove Patient</button>
</form>

<!-- Transfer Patient Form -->
<h3>Transfer Patient to Another Department</h3>
<form on:submit|preventDefault={transferPatientDepartment}>
    <input bind:value={transferPatient.oldDepartmentId} placeholder="Old Department ID" />
    <input bind:value={transferPatient.newDepartmentId} placeholder="New Department ID" />
    <input bind:value={transferPatient.patientId} placeholder="Patient ID" />
    <button type="submit">Transfer Patient</button>
</form>
