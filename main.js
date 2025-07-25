let customers = [];
let customerCpfToDelete = null;

function loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    try {
        customers = storedCustomers ? JSON.parse(storedCustomers) : [];
    } catch (e) {
        console.error("Erro ao carregar clientes:", e);
        localStorage.removeItem('customers');
        customers = [];
    }
}

function saveCustomers(customersToSave) {
    localStorage.setItem('customers', JSON.stringify(customersToSave));
}

function showFormMessage(message, type) {
    const formMessage = $('#formMessage');
    formMessage.removeClass('d-none alert-success alert-danger').addClass(`alert-${type}`).text(message);
    setTimeout(() => formMessage.addClass('d-none'), 5000);
}

function formatCpf(cpfValue) {
    cpfValue = String(cpfValue).replace(/\D/g, '');
    if (cpfValue.length === 11) {
        return cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpfValue;
}

function renderCustomersTable() {
    const tableBody = $('#customerTableBody');
    tableBody.empty();

    if (customers.length === 0) {
        tableBody.append('<tr><td colspan="6" class="text-center">Nenhum cliente cadastrado.</td></tr>');
        return;
    }

    customers.forEach(customer => {
        const formattedCpf = formatCpf(customer.cpf);
        const row = `
            <tr>
                <td>${customer.fullName}</td>
                <td>${customer.email}</td>
                <td>${formattedCpf}</td>
                <td>${customer.dob}</td>
                <td>${customer.gender.charAt(0).toUpperCase() + customer.gender.slice(1)}</td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm remove-btn rounded" data-cpf="${customer.cpf}">Remover</button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });

    $('.remove-btn').on('click', function() {
        customerCpfToDelete = $(this).data('cpf');
        new bootstrap.Modal(document.getElementById('confirmDeleteModal')).show();
    });
}

function removeCustomer(cpf) {
    const cleanCpfToRemove = String(cpf).replace(/\D/g, '');

    const initialLength = customers.length;
    customers = customers.filter(customer => {
        const storedCustomerCleanCpf = String(customer.cpf).replace(/\D/g, '');
        return storedCustomerCleanCpf !== cleanCpfToRemove;
    });

    if (customers.length < initialLength) {
        saveCustomers(customers);
        renderCustomersTable();
        showFormMessage('Cliente removido com sucesso!', 'success');
    } else {
        showFormMessage('Erro ao remover cliente. CPF não encontrado.', 'danger');
    }
}

$(document).ready(function() {
    loadCustomers();
    renderCustomersTable();

    $('#cpf').on('input', function() {
        let cpfValue = $(this).val().replace(/\D/g, '');
        let maskedCpf = '';

        if (cpfValue.length > 0) {
            maskedCpf += cpfValue.substring(0, 3);
        }
        if (cpfValue.length > 3) {
            maskedCpf += '.' + cpfValue.substring(3, 6);
        }
        if (cpfValue.length > 6) {
            maskedCpf += '.' + cpfValue.substring(6, 9);
        }
        if (cpfValue.length > 9) {
            maskedCpf += '-' + cpfValue.substring(9, 11);
        }

        $(this).val(maskedCpf);
    });

    $('#customerForm').on('submit', function(event) {
        event.preventDefault();

        const form = $(this);
        let isValid = true;

        form.find('.form-control, .form-select').removeClass('is-invalid is-valid');
        form.find('.invalid-feedback').hide();

        const fullName = $('#fullName');
        if (fullName.val().trim() === '') {
            fullName.addClass('is-invalid').next('.invalid-feedback').text('Por favor, insira o nome completo.').show();
            isValid = false;
        } else {
            fullName.addClass('is-valid');
        }

        const email = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.val().trim() === '' || !emailRegex.test(email.val())) {
            email.addClass('is-invalid').next('.invalid-feedback').text('Por favor, insira um email válido.').show();
            isValid = false;
        } else {
            email.addClass('is-valid');
        }

        const cpf = $('#cpf');
        const cpfValue = cpf.val().replace(/\D/g, '');
        if (cpfValue === '' || !/^\d{11}$/.test(cpfValue)) {
            cpf.addClass('is-invalid').next('.invalid-feedback').text('Por favor, insira um CPF válido com 11 dígitos numéricos.').show();
            isValid = false;
        } else if (customers.some(c => String(c.cpf).replace(/\D/g, '') === cpfValue)) { // Limpa o CPF armazenado para comparação
            cpf.addClass('is-invalid').next('.invalid-feedback').text('Este CPF já está cadastrado.').show();
            isValid = false;
        } else {
            cpf.addClass('is-valid');
        }

        const dob = $('#dob');
        if (dob.val().trim() === '') {
            dob.addClass('is-invalid').next('.invalid-feedback').text('Por favor, insira a data de nascimento.').show();
            isValid = false;
        } else {
            dob.addClass('is-valid');
        }

        const gender = $('#gender');
        if (gender.val() === '') {
            gender.addClass('is-invalid').next('.invalid-feedback').text('Por favor, selecione o gênero.').show();
            isValid = false;
        } else {
            gender.addClass('is-valid');
        }

        if (isValid) {
            const newCustomer = {
                fullName: fullName.val().trim(),
                email: email.val().trim(),
                cpf: cpfValue,
                dob: dob.val(),
                gender: gender.val()
            };

            customers.push(newCustomer);
            saveCustomers(customers);
            renderCustomersTable();
            showFormMessage('Cliente cadastrado com sucesso!', 'success');
            form[0].reset();
            form.find('.form-control, .form-select').removeClass('is-valid');
        } else {
            showFormMessage('Por favor, corrija os erros no formulário.', 'danger');
        }
    });

    $('#confirmDeleteBtn').on('click', function() {
        if (customerCpfToDelete) {
            removeCustomer(customerCpfToDelete);
            customerCpfToDelete = null;
            bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
        }
    });
});
